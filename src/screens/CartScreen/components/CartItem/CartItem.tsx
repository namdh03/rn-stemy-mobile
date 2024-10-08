import { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable as RNPressable, View } from 'react-native';
import { I18nManager } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import InputPositiveNumber from '~components/customs/InputPositiveNumber';
import Pressable from '~components/customs/Pressable';
import { Minus, Plus } from '~components/icons';
import { Checkbox } from '~components/ui/checkbox';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetCartQuery } from '~graphql/graphql';
import { useDebounce } from '~hooks';
import { DeleteCartsMutation, UpdateCartMutation } from '~services/cart.services';
import { useCartStore } from '~store';
import { MainStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

interface CartItemProps {
  item: GetCartQuery['carts'][number];
}

const MAX_QUANTITY_CART = 99;

const CartItem = memo(({ item }: CartItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();
  const { selectedCart, setSelectedCart, updateCartItemQuantity, removeCartItem } = useCartStore(
    useShallow((state) => ({
      selectedCart: state.selectedCart,
      setSelectedCart: state.setSelectedCart,
      updateCartItemQuantity: state.updateCartItemQuantity,
      removeCartItem: state.removeCartItem,
    })),
  );
  const quantityDebounce = useDebounce(item.quantity);
  const quantityRef = useRef<number>(item.quantity);
  const { mutate: deleteCartItem } = useMutation({
    mutationFn: (cartId: number) => execute(DeleteCartsMutation, { cartId: [cartId] }),
  });
  const { mutate: updateCartItem } = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) =>
      execute(UpdateCartMutation, { cartId, quantity }),
  });
  const swipeableRowRef = useRef<Swipeable>(null);

  useEffect(() => {
    if (quantityDebounce && quantityDebounce !== quantityRef.current) {
      updateCartItem(
        { cartId: Number(item.id), quantity: quantityDebounce },
        {
          onError: (errors) => {
            updateCartItemQuantity(item.id, quantityRef.current);
            if (isErrors(errors)) {
              const error = errors.find((error) => error.path.includes('updateCart'));
              if (error?.message) {
                return showDialogError({ textBody: error.message });
              }
            }
            showDialogError();
          },
        },
      );
    }
  }, [quantityDebounce]);

  const handleSelectedChange = () => setSelectedCart(item);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    updateCartItemQuantity(item.id, newQuantity);
  }, []);

  const handleIncreaseQuantity = useCallback(() => {
    handleQuantityChange(item.quantity + 1);
  }, [item.quantity, handleQuantityChange]);

  const handleDecreaseQuantity = useCallback(() => {
    handleQuantityChange(item.quantity - 1);
  }, [item.quantity, handleQuantityChange]);

  const handleDeleteCartItem = () => {
    swipeableRowRef.current?.close();
    deleteCartItem(Number(item.id), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [constants.CART_QUERY_KEY.GET_CART_COUNT_QUERY_KEY] });
        removeCartItem(item.id);
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('deleteCarts'));
          if (error?.message) {
            return showDialogError({ textBody: error.message });
          }
        }
        showDialogError();
      },
    });
  };

  const handleNavigationToProductDetail = () => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: {
        id: item.product.id,
      },
    });
  };

  const renderRightAction = (text: string, x: number, progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Pressable className='flex-1 items-center justify-center bg-destructive' onPress={handleDeleteCartItem}>
          <Text className='font-inter-regular text-background text-pretty text-[14px]'>{text}</Text>
        </Pressable>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => (
    <View
      style={{
        width: 66,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}
    >
      {renderRightAction('Delete', 66, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      overshootRight={false}
    >
      <RNPressable>
        <View className='flex-row items-center'>
          <Checkbox
            checked={selectedCart ? item.id in selectedCart : false}
            onCheckedChange={handleSelectedChange}
            className='mr-[12px]'
          />
          <Pressable onPress={handleNavigationToProductDetail}>
            <Image
              source={item.product.images[0]?.url}
              placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
              style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 4 }}
              contentFit='cover'
            />
          </Pressable>
          <View className='flex-1 items-start ml-[16px]'>
            <Text numberOfLines={1} className='font-inter-bold text-foreground text-[14px]'>
              {item.product.name}
            </Text>

            {item.hasLab ? (
              <Text className='font-inter-medium text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
                Lab included
              </Text>
            ) : (
              <Text className='font-inter-medium text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
                No Lab
              </Text>
            )}

            <View className='flex-row items-center gap-[27px] mt-[14px]'>
              <View className='flex-row items-center'>
                <Pressable
                  className={`p-[7px] rounded-full bg-[#16a34a1a] ${item.quantity <= 1 && 'bg-muted'}`}
                  onPress={handleDecreaseQuantity}
                  disabled={item.quantity <= 1}
                >
                  <Minus className={item.quantity <= 1 ? 'text-muted-foreground' : 'text-primary'} size={10} />
                </Pressable>

                {item.hasLab ? (
                  <Text className='font-inter-medium px-[12px] text-foreground text-[16px] leading-[20px]'>
                    {item.quantity}
                  </Text>
                ) : (
                  <InputPositiveNumber
                    className='font-inter-medium min-w-[30px] px-[4px] py-[6px] border-transparent text-center text-foreground text-[14px] leading-[20px]'
                    value={item.quantity}
                    onChange={handleQuantityChange}
                  />
                )}

                <Pressable
                  className={`p-[7px] rounded-full bg-[#16a34a1a] ${(item.quantity >= MAX_QUANTITY_CART || item.hasLab) && 'bg-muted'}`}
                  onPress={handleIncreaseQuantity}
                  disabled={item.quantity >= MAX_QUANTITY_CART || item.hasLab}
                >
                  <Plus
                    className={
                      item.quantity >= MAX_QUANTITY_CART || item.hasLab ? 'text-muted-foreground' : 'text-primary'
                    }
                    size={10}
                  />
                </Pressable>
              </View>

              <Text className='font-inter-extraBold text-left text-foreground text-[14px] break-words flex-shrink pr-[24px]'>
                {(item.product.price * item.quantity).toLocaleString()} ₫
              </Text>
            </View>
          </View>
        </View>
      </RNPressable>
    </Swipeable>
  );
});

export default CartItem;
