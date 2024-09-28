import React, { useLayoutEffect } from 'react';
import { FlatList, Keyboard, Pressable, Text as RNText, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { GET_CART_QUERY_KEY } from '~constants/cart-query-key';
import execute from '~graphql/execute';
import { useRefreshByUser } from '~hooks';
import { GetCartQuery } from '~services/cart.services';
import { useStore } from '~store';

import CartItem from './components/CartItem';

const CartScreen = () => {
  const { total, cart, setCart } = useStore(
    useShallow((state) => ({
      total: state.total,
      cart: state.cart,
      setCart: state.setCart,
    })),
  );
  const { data, refetch, isFetching } = useQuery({
    queryKey: [GET_CART_QUERY_KEY],
    queryFn: () => execute(GetCartQuery),
    select: (data) => data.data.carts,
  });
  useRefreshByUser(refetch);

  useLayoutEffect(() => {
    if (data) setCart(data);

    return () => {
      setCart([]);
    };
  }, [data]);

  const handleCheckout = () => {
    console.log('CHECKOUT');
  };

  if (isFetching) {
    return <LoadingOverlay loop />;
  }

  return (
    <Pressable className='flex-1 pl-[24px] py-[24px]' onPress={Keyboard.dismiss}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        ItemSeparatorComponent={() => <Separator className='my-[14px]' />}
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 140 }}
      />

      <View className='absolute left-0 right-0 bottom-0 px-[24px] pt-[12px] pb-[24px] bg-card'>
        <View className='flex-row items-center justify-between px-[12px] py-[8px]'>
          <Text className='font-inter-regular text-muted-foreground text-[16px] leading-[20px]'>Total</Text>
          <Text className='font-inter-extraBold text-foreground text-[16px]'>{total.toLocaleString()} ₫</Text>
        </View>

        <Button size='lg' className='mt-[16px]' onPress={handleCheckout}>
          <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Checkout</RNText>
        </Button>
      </View>
    </Pressable>
  );
};

export default CartScreen;
