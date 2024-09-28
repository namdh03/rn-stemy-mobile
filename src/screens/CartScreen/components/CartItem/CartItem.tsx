import { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable as RNPressable, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';

import InputPositiveNumber from '~components/customs/InputPositiveNumber';
import Pressable from '~components/customs/Pressable';
import { Info, Minus, Plus } from '~components/icons';
import { Checkbox } from '~components/ui/checkbox';
import { Text } from '~components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~components/ui/tooltip';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetCartQuery } from '~graphql/graphql';
import { useDebounce } from '~hooks';
import { DeleteCartsMutation, UpdateCartMutation } from '~services/cart.services';
import { useStore } from '~store';
import { MainStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

interface CartItemProps {
  item: GetCartQuery['carts'][number];
}

const MAX_QUANTITY_CART = 99;

const CartItem = memo(({ item }: CartItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { selectedCart, setSelectedCart, updateCartItemQuantity, removeCartItem } = useStore(
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
  const swipeableRef = useRef<Swipeable>(null);

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

  const handleDeleteCartItem = (swipeable: Swipeable) => {
    swipeable.close();
    deleteCartItem(Number(item.id), {
      onSuccess: () => {
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

  const handleLongPress = () => {
    // Open the swipeable item when long pressed
    if (swipeableRef.current) {
      swipeableRef.current.openRight();
    }
  };

  const handleNavigationToProductDetail = () => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: {
        id: item.product.id,
      },
    });
  };

  // Render right swipe action (Delete button)
  const renderRightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
    swipeable: Swipeable,
  ) => {
    const opacity = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View style={{ opacity }}>
        <Pressable
          className='justify-center items-center bg-destructive w-[80px] h-full'
          onPress={() => handleDeleteCartItem(swipeable)}
        >
          <Text className='font-inter-bold text-background text-pretty'>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <RNPressable onLongPress={handleLongPress}>
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
              style={{ width: 90, height: 90, alignSelf: 'center', borderRadius: 4 }}
              contentFit='cover'
            />
          </Pressable>
          <View className='flex-1 items-start gap-[10px] ml-[14px]'>
            <Text numberOfLines={1} className='font-inter-bold text-foreground text-[14px]'>
              {item.product.name}
            </Text>

            {item.hasLab ? (
              <Tooltip delayDuration={150}>
                <TooltipTrigger className='active:opacity-50'>
                  <View className='flex-row items-center gap-[4px] px-[8px] py-[2px] rounded-md bg-green-50 border border-green-500'>
                    <Text className='font-inter-medium text-green-600 text-[12px]'>Lab included</Text>
                    <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-green-600' />
                  </View>
                </TooltipTrigger>
                <TooltipContent className='py-2 px-4 shadow'>
                  <Text className='font-inter-regular text-[16px]'>Only 1 unit with lab included</Text>
                </TooltipContent>
              </Tooltip>
            ) : (
              <View className='px-[8px] py-[2px] rounded-md bg-red-50 border border-red-500'>
                <Text className='font-inter-medium text-red-600 text-[12px]'>No Lab</Text>
              </View>
            )}

            <View className='flex-row items-center gap-[26px]'>
              <View className='flex-row items-center gap-[2px]'>
                <Pressable
                  className={`p-[7px] rounded-full bg-[#16a34a1a] ${item.quantity <= 1 && 'bg-muted'}`}
                  onPress={handleDecreaseQuantity}
                  disabled={item.quantity <= 1}
                >
                  <Minus className={item.quantity <= 1 ? 'text-muted-foreground' : 'text-primary'} size={16} />
                </Pressable>
                <InputPositiveNumber
                  className='font-inter-medium min-w-[30px] px-[4px] text-center text-foreground text-[14px] border-transparent'
                  value={item.quantity}
                  onChange={handleQuantityChange}
                />
                <Pressable
                  className={`p-[7px] rounded-full bg-[#16a34a1a] ${(item.quantity >= MAX_QUANTITY_CART || item.hasLab) && 'bg-muted'}`}
                  onPress={handleIncreaseQuantity}
                  disabled={item.quantity >= MAX_QUANTITY_CART || item.hasLab}
                >
                  <Plus
                    className={
                      item.quantity >= MAX_QUANTITY_CART || item.hasLab ? 'text-muted-foreground' : 'text-primary'
                    }
                    size={16}
                  />
                </Pressable>
              </View>

              <Text className='font-inter-extraBold text-left text-foreground text-[14px] break-words flex-shrink'>
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
