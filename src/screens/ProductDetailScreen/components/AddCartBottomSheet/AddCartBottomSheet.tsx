import React, { forwardRef, useMemo, useState } from 'react';
import { ActivityIndicator, Text as RNText, View } from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';

import Pressable from '~components/customs/Pressable';
import { CircleX, Minus, Plus } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useColorScheme } from '~hooks';
import { AddToCartMutation } from '~services/cart.services';
import { ProductDetailStackParamList } from '~types/navigation';
import isErrors from '~utils/responseChecker';

interface AddCartBottomSheetProps {
  defaultPrice: number;
  onClose: () => void;
}

const MAX_QUANTITY_CART = 99;

const AddCartBottomSheet = forwardRef<BottomSheet, AddCartBottomSheetProps>(({ defaultPrice, onClose }, ref) => {
  const route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'> = useRoute();
  const [quantity, setQuantity] = useState(1);
  const { isDarkColorScheme } = useColorScheme();
  const priceByQuantity = useMemo(() => defaultPrice * quantity, [quantity]);

  const { mutate, isPending } = useMutation({
    mutationFn: (productId: number) => execute(AddToCartMutation, { productId, quantity }),
  });

  const handleIncreaseQuantity = () => {
    setQuantity((prevQ) => prevQ + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQ) => prevQ - 1);
  };

  const handleAddToCart = () => {
    if (!route.params.id) return;
    mutate(Number(route.params.id), {
      onSuccess: () => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
          textBody: constants.MESSAGES.CART_MESSAGES.ADD_TO_CART_SUCCESSFULLY,
          button: 'Close',
        });
        onClose();
      },
      onError: (errors) => {
        console.log(errors);
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('addToCart'));

          if (error?.message) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
              textBody: error.message,
              button: 'close',
            });
          }
        }
      },
    });
  };

  return (
    <BottomSheet ref={ref} snapPoints={['45%', '45%']} enablePanDownToClose>
      <BottomSheetView
        className='flex-1 pt-[20px] pb-[25px]'
        style={isDarkColorScheme ? { backgroundColor: 'black' } : { backgroundColor: 'white' }}
      >
        <View className='flex-row items-center justify-between px-[25px] pb-[20px]'>
          <Text className='font-inter-bold text-foreground text-[18px] leading-[24px] tracking-[0.2px]'>
            Add to Cart
          </Text>
          <Pressable onPress={onClose}>
            <CircleX size={24} className='text-foreground' />
          </Pressable>
        </View>

        <Separator />

        <View className='px-[25px] py-[20px]'>
          <View className='flex-row items-center justify-between'>
            <Text className='font-inter-medium text-foreground text-[16px]'>Quantity</Text>

            <View className='flex-row items-center gap-[16px]'>
              <Pressable onPress={handleDecreaseQuantity} disabled={quantity <= 1}>
                <Minus className={quantity <= 1 ? 'text-muted-foreground' : 'text-primary'} size={24} />
              </Pressable>
              <Text className='font-inter-medium text-foreground text-[16px]'>{quantity}</Text>
              <Pressable onPress={handleIncreaseQuantity} disabled={quantity >= MAX_QUANTITY_CART}>
                <Plus className={quantity >= MAX_QUANTITY_CART ? 'text-muted-foreground' : 'text-primary'} size={24} />
              </Pressable>
            </View>
          </View>

          <Separator className='my-[20px]' />

          <View className='gap-[10px]'>
            <Text className='font-inter-regular text-muted-foreground text-[14px] tracking-[0.2px]'>Total</Text>
            <Text className='font-inter-bold text-foreground text-[16px]'>{priceByQuantity.toLocaleString()} ₫</Text>
          </View>

          <Button size='lg' className='mt-[22px]' onPress={handleAddToCart}>
            {isPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Loading...</RNText>
              </View>
            ) : (
              <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Add to Card</RNText>
            )}
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default AddCartBottomSheet;
