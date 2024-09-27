import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text as RNText, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';

import InputPositiveNumber from '~components/customs/InputPositiveNumber/InputPositiveNumber';
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
import showDialogError from '~utils/showDialogError';
import showDialogSuccess from '~utils/showDialogSuccess';

interface AddCartBottomSheetProps {
  defaultPrice: number;
  onFocus: () => void;
  onClose: () => void;
}

type LabOption = 'lab' | 'no-lab';

const MAX_QUANTITY_CART = 99;

const AddCartBottomSheet = forwardRef<BottomSheet, AddCartBottomSheetProps>(
  ({ defaultPrice, onFocus, onClose }, ref) => {
    const route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'> = useRoute();
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState<LabOption>('lab');
    const { isDarkColorScheme } = useColorScheme();
    const priceByQuantity = useMemo(() => defaultPrice * quantity, [defaultPrice, quantity]);

    const { mutate, isPending } = useMutation({
      mutationFn: (productId: number) => execute(AddToCartMutation, { productId, quantity }),
    });

    const handleQuantityChange = useCallback((newQuantity: number) => {
      setQuantity(newQuantity);
    }, []);

    const handleOptionSelect = (option: LabOption) => {
      setSelectedOption(option);
    };

    const handleIncreaseQuantity = useCallback(() => {
      handleQuantityChange(quantity + 1);
    }, [quantity, handleQuantityChange]);

    const handleDecreaseQuantity = useCallback(() => {
      handleQuantityChange(quantity - 1);
    }, [quantity, handleQuantityChange]);

    const handleAddToCart = useCallback(() => {
      if (!route.params.id) return;
      mutate(Number(route.params.id), {
        onSuccess: () => {
          showDialogSuccess({ textBody: constants.MESSAGES.CART_MESSAGES.ADD_TO_CART_SUCCESSFULLY });
          onClose();
        },
        onError: (errors) => {
          if (isErrors(errors)) {
            const error = errors.find((error) => error.path.includes('addToCart'));
            if (error?.message) {
              return showDialogError({ textBody: error.message });
            }
          }
          showDialogError();
        },
      });
    }, [route.params.id, mutate, onClose]);

    return (
      <BottomSheet ref={ref} snapPoints={['66%', '66%']} enablePanDownToClose index={-1}>
        <BottomSheetView
          className='flex-1 pt-[20px] pb-[25px]'
          style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}
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

              <View className='flex-row items-center gap-[8px]'>
                <Pressable onPress={handleDecreaseQuantity} disabled={quantity <= 1}>
                  <Minus className={quantity <= 1 ? 'text-muted-foreground' : 'text-primary'} size={24} />
                </Pressable>
                <InputPositiveNumber
                  className='font-inter-medium text-foreground text-[16px] border-transparent'
                  value={quantity}
                  onChange={handleQuantityChange}
                  onFocus={onFocus}
                />
                <Pressable onPress={handleIncreaseQuantity} disabled={quantity >= MAX_QUANTITY_CART}>
                  <Plus
                    className={quantity >= MAX_QUANTITY_CART ? 'text-muted-foreground' : 'text-primary'}
                    size={24}
                  />
                </Pressable>
              </View>
            </View>

            <Separator className='my-[20px]' />

            <View className='gap-[14px]'>
              <Text className='font-inter-medium text-foreground text-[16px]'>Variant</Text>

              <View className='flex-row gap-[10px]'>
                <Pressable
                  className={`px-[18px] py-[6px] border border-transparent rounded-[10px] ${selectedOption === 'lab' ? 'bg-[#16a34a1a] text-background' : 'bg-transparent border-accent'}`}
                  onPress={() => handleOptionSelect('lab')}
                >
                  <Text
                    className={`font-inter-medium text-[14px] leading-[20px] ${selectedOption === 'lab' ? 'text-primary' : 'text-foreground'}`}
                  >
                    Lab included
                  </Text>
                </Pressable>

                <Pressable
                  className={`px-[18px] py-[6px] border border-transparent rounded-[10px] ${selectedOption === 'no-lab' ? 'bg-[#16a34a1a] text-background' : 'bg-transparent border-accent'}`}
                  onPress={() => handleOptionSelect('no-lab')}
                >
                  <Text
                    className={`font-inter-medium text-[14px] leading-[20px] ${selectedOption === 'no-lab' ? 'text-primary' : 'text-foreground'}`}
                  >
                    No Lab
                  </Text>
                </Pressable>
              </View>
            </View>

            <Separator className='my-[20px]' />

            <View className='gap-[10px]'>
              <Text className='font-inter-regular text-muted-foreground text-[16px] tracking-[0.2px]'>Total</Text>
              <Text className='font-inter-bold text-foreground text-[16px]'>{priceByQuantity.toLocaleString()} ₫</Text>
            </View>

            <Button size='lg' className='mt-[22px]' onPress={handleAddToCart}>
              {isPending ? (
                <View className='flex-row items-center justify-center gap-[6px]'>
                  <ActivityIndicator className='text-secondary' />
                  <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Loading...</RNText>
                </View>
              ) : (
                <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Add to Cart</RNText>
              )}
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default AddCartBottomSheet;
