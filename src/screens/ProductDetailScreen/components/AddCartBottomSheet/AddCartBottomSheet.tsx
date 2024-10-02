import { forwardRef, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Keyboard, Pressable as RNPressable, Text as RNText, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import InputPositiveNumber from '~components/customs/InputPositiveNumber/InputPositiveNumber';
import Pressable from '~components/customs/Pressable';
import { CircleX, Minus, Plus } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GET_CART_COUNT_QUERY_KEY, GET_CART_QUERY_KEY } from '~constants/cart-query-key';
import execute from '~graphql/execute';
import { useColorScheme } from '~hooks';
import { AddToCartMutation } from '~services/cart.services';
import { ProductDetailStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogSuccess from '~utils/showDialogSuccess';

interface AddCartBottomSheetProps {
  defaultPrice: number;
  labPrice: number;
  onFocus: () => void;
  onClose: () => void;
}

type LabOption = 'lab' | 'no-lab';

const DEFAULT_QUANTITY_CART = 1;
const MAX_QUANTITY_CART = 99;
const DEFAULT_SELECTED_OPTION = 'lab';

const AddCartBottomSheet = forwardRef<BottomSheet, AddCartBottomSheetProps>(
  ({ defaultPrice, labPrice, onFocus, onClose }, ref) => {
    const route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'> = useRoute();
    const { isDarkColorScheme } = useColorScheme();
    const queryClient = useQueryClient();
    const [quantity, setQuantity] = useState(DEFAULT_QUANTITY_CART);
    const [selectedOption, setSelectedOption] = useState<LabOption>(DEFAULT_SELECTED_OPTION);
    const priceByQuantity = useMemo(
      () => (selectedOption === DEFAULT_SELECTED_OPTION ? defaultPrice + labPrice : defaultPrice) * quantity,
      [defaultPrice, quantity, selectedOption],
    );
    const { mutate, isPending } = useMutation({
      mutationFn: (productId: number) =>
        execute(AddToCartMutation, { productId, quantity, hasLab: selectedOption === DEFAULT_SELECTED_OPTION }),
    });

    const handleBottomSheetClose = () => {
      if (quantity !== DEFAULT_QUANTITY_CART) setQuantity(DEFAULT_QUANTITY_CART);
      if (selectedOption !== DEFAULT_SELECTED_OPTION) setSelectedOption(DEFAULT_SELECTED_OPTION);
    };

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
          queryClient.invalidateQueries({ queryKey: [GET_CART_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [GET_CART_COUNT_QUERY_KEY] });
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
      <BottomSheet
        ref={ref}
        snapPoints={['75%', '75%']}
        enablePanDownToClose
        index={-1}
        onClose={handleBottomSheetClose}
      >
        <BottomSheetView
          className='flex-1 pt-[20px] pb-[25px]'
          style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}
        >
          <RNPressable onPress={Keyboard.dismiss}>
            <View className='flex-row items-center justify-between px-[25px] pb-[20px]'>
              <Text className='font-inter-bold text-foreground text-[18px] leading-[24px] tracking-[0.2px]'>
                Add to Cart
              </Text>
              <Pressable onPress={onClose}>
                <CircleX size={24} className='text-foreground' />
              </Pressable>
            </View>

            <Separator className='bg-muted' />

            <View className='px-[25px] py-[20px]'>
              <View className='flex-row items-center justify-between'>
                <Text className='font-inter-medium text-foreground text-[16px]'>Quantity</Text>

                <View className='flex-row items-center gap-[8px]'>
                  <Pressable onPress={handleDecreaseQuantity} disabled={quantity <= 1}>
                    <Minus className={quantity <= 1 ? 'text-muted-foreground' : 'text-primary'} size={24} />
                  </Pressable>
                  <InputPositiveNumber
                    className='font-inter-medium text-foreground px-[4px] text-[16px] border-transparent'
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

              <Separator className='my-[20px] bg-muted' />

              <View className='gap-[14px]'>
                <Text className='font-inter-medium text-foreground text-[16px]'>Variant</Text>

                <View className='flex-row gap-[10px]'>
                  <Pressable
                    className={`px-[18px] py-[6px] rounded-[10px] ${selectedOption === DEFAULT_SELECTED_OPTION ? 'bg-[#16a34a1a] text-background' : 'bg-transparent border border-muted'}`}
                    onPress={() => handleOptionSelect(DEFAULT_SELECTED_OPTION)}
                  >
                    <Text
                      className={`font-inter-medium text-[14px] leading-[20px] ${selectedOption === DEFAULT_SELECTED_OPTION ? 'text-primary' : 'text-foreground'}`}
                    >
                      Lab included
                    </Text>
                  </Pressable>

                  <Pressable
                    className={`px-[18px] py-[6px] rounded-[10px] ${selectedOption === 'no-lab' ? 'bg-[#16a34a1a] text-background' : 'bg-transparent  border border-muted'}`}
                    onPress={() => handleOptionSelect('no-lab')}
                  >
                    <Text
                      className={`font-inter-medium text-[14px] leading-[20px] ${selectedOption === 'no-lab' ? 'text-primary' : 'text-foreground'}`}
                    >
                      No Lab
                    </Text>
                  </Pressable>
                </View>

                <Text className='font-inter-regular text-[14px] text-muted-foreground tracking-[0.2px]'>
                  You can only buy 1 lab per kit
                </Text>
              </View>

              <Separator className='my-[20px] bg-muted' />

              <View className='gap-[10px]'>
                <Text className='font-inter-regular text-muted-foreground text-[14px] tracking-[0.2px]'>Total</Text>
                <Text className='font-inter-bold text-foreground text-[14px]'>
                  {priceByQuantity.toLocaleString()} ₫
                </Text>
              </View>

              <Button disabled={isPending} size='lg' className='mt-[22px]' onPress={handleAddToCart}>
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
          </RNPressable>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default AddCartBottomSheet;
