import React, { useLayoutEffect } from 'react';
import { FlatList, Text as RNText, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import images from '~assets/images';
import LoadingOverlay from '~components/customs/LoadingOverlay';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useRefreshByUser } from '~hooks';
import { GetCartQuery } from '~services/cart.services';
import { useCartStore, useStore } from '~store';
import { CartScreenNavigationProps } from '~types/navigation.type';

import CartItem from './components/CartItem';

const CartScreen = ({ navigation }: CartScreenNavigationProps) => {
  const { total, cart, selectedCart, setCart } = useCartStore(
    useShallow((state) => ({
      total: state.total,
      cart: state.cart,
      selectedCart: state.selectedCart,
      setCart: state.setCart,
    })),
  );
  const setCheckoutData = useStore(useShallow((state) => state.setCheckoutData));
  const { data, refetch, isFetching, isFetchedAfterMount } = useQuery({
    queryKey: [constants.CART_QUERY_KEY.GET_CART_QUERY_KEY],
    queryFn: () => execute(GetCartQuery),
    select: (data) => data.data.carts,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useLayoutEffect(() => {
    if (data && isFetchedAfterMount) setCart(data);

    return () => {
      setCart([]);
    };
  }, [data, isFetchedAfterMount]);

  const handleCheckout = () => {
    navigation.navigate('CheckoutScreen');
    setCheckoutData({ cartIds: Object.keys(selectedCart || {}).map(Number) });
  };

  if (isFetching) {
    return <LoadingOverlay loop />;
  }

  return cart.length > 0 ? (
    <>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexShrink: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 24,
        }}
        className='bg-card'
      >
        <View className='flex-row items-center justify-between px-[12px] py-[8px]'>
          <Text className='font-inter-regular text-muted-foreground text-[14px] leading-[20px]'>Total</Text>
          <Text className='font-inter-extraBold text-foreground text-[14px]'>{total.toLocaleString()} ₫</Text>
        </View>

        <Button
          size='lg'
          className='mt-[16px]'
          onPress={handleCheckout}
          disabled={!Object.values(selectedCart || {}).length}
        >
          <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Checkout</RNText>
        </Button>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <CartItem item={item} />
          </View>
        )}
        ItemSeparatorComponent={() => <Separator className='bg-muted my-[12px]' />}
        contentContainerStyle={{ flexGrow: 1, paddingTop: 24, paddingLeft: 24, paddingBottom: 140 }}
        refreshControl={
          <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      />
    </>
  ) : (
    <View className='flex-1 justify-center items-center gap-[8px] mr-[24px] pb-[140px]'>
      <Image
        source={images.cartEmpty}
        placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
        style={{ width: 150, height: 150 }}
        contentFit='cover'
      />
      <Text className='font-inter-regular text-center text-muted-foreground text-[14px]'>
        Your cart is empty, awaiting great selections.
      </Text>
    </View>
  );
};

export default CartScreen;
