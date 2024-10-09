import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
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
  const [quantity, setQuantity] = useState(item.quantity);
  const quantityDebounce = useDebounce(quantity);
  const quantityRef = useRef(item.quantity);
  const swipeableRowRef = useRef<Swipeable>(null);

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: (cartId: number) => execute(DeleteCartsMutation, { cartId: [cartId] }),
  });

  const { mutate: updateCartItem } = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) =>
      execute(UpdateCartMutation, { cartId, quantity }),
  });

  useEffect(() => {
    if (quantityDebounce && quantityDebounce !== quantityRef.current) {
      updateCartItemQuantity(item.id, quantityDebounce);
      updateCartItem(
        { cartId: Number(item.id), quantity: quantityDebounce },
        {
          onSuccess: () => {
            quantityRef.current = quantityDebounce;
          },
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
  }, [quantityDebounce, item.id, updateCartItemQuantity, updateCartItem]);

  const handleSelectedChange = useCallback(() => setSelectedCart(item), [item, setSelectedCart]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);

  const handleIncreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, constants.CART.MAX_QUANTITY_CART));
  }, []);

  const handleDecreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, constants.CART.MIN_QUANTITY_CART));
  }, []);

  const handleDeleteCartItem = useCallback(() => {
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
  }, [item.id, deleteCartItem, queryClient, removeCartItem]);

  const handleNavigationToProductDetail = useCallback(() => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: {
        id: item.product.id,
      },
    });
  }, [navigation, item.product.id]);

  const renderRightAction = useCallback(
    (text: string, x: number, progress: Animated.AnimatedInterpolation<number>) => {
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
    },
    [handleDeleteCartItem],
  );

  const renderRightActions = useCallback(
    (progress: Animated.AnimatedInterpolation<number>) => (
      <View
        style={{
          width: 66,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
      >
        {renderRightAction('Delete', 66, progress)}
      </View>
    ),
    [renderRightAction],
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
      <View className='flex-row items-center'>
        <Checkbox
          checked={selectedCart ? item.id in selectedCart : false}
          onCheckedChange={handleSelectedChange}
          className='mr-[12px]'
        />
        <Pressable className='flex-1' onPress={handleNavigationToProductDetail}>
          <View className='flex-1 flex-row items-center'>
            <Image
              source={item.product.images[0]?.url}
              placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
              style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 4 }}
              contentFit='cover'
            />
            <View className='flex-1 items-start ml-[16px]'>
              <Text numberOfLines={1} className='font-inter-bold text-foreground text-[14px]'>
                {item.product.name}
              </Text>

              <Text className='font-inter-medium text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
                {item.hasLab ? 'Lab included' : 'No Lab'}
              </Text>

              <View className='flex-row items-center gap-[27px] mt-[14px]'>
                <View className='flex-row items-center'>
                  <Pressable
                    className={`p-[7px] rounded-full bg-[#16a34a1a] ${quantity <= constants.CART.MIN_QUANTITY_CART && 'bg-muted'}`}
                    onPress={handleDecreaseQuantity}
                    disabled={quantity <= constants.CART.MIN_QUANTITY_CART}
                  >
                    <Minus
                      className={
                        quantity <= constants.CART.MIN_QUANTITY_CART ? 'text-muted-foreground' : 'text-primary'
                      }
                      size={10}
                    />
                  </Pressable>

                  <InputPositiveNumber
                    className='font-inter-medium min-w-[30px] px-[4px] py-[6px] border-transparent text-center text-foreground text-[14px] leading-[20px]'
                    value={quantity}
                    onChange={handleQuantityChange}
                  />

                  <Pressable
                    className={`p-[7px] rounded-full bg-[#16a34a1a] ${quantity >= constants.CART.MAX_QUANTITY_CART && 'bg-muted'}`}
                    onPress={handleIncreaseQuantity}
                    disabled={quantity >= constants.CART.MAX_QUANTITY_CART}
                  >
                    <Plus
                      className={
                        quantity >= constants.CART.MAX_QUANTITY_CART ? 'text-muted-foreground' : 'text-primary'
                      }
                      size={10}
                    />
                  </Pressable>
                </View>

                <Text className='font-inter-extraBold w-full text-right text-foreground text-[14px] break-words flex-shrink pr-[24px]'>
                  {(
                    (item.hasLab ? item.product.price + (item.product.lab?.price || 0) : item.product.price) *
                    item.quantity
                  ).toLocaleString()}
                  ₫
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </Swipeable>
  );
});

export default CartItem;
