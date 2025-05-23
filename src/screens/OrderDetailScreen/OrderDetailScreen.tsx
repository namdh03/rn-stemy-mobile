import { useCallback, useMemo } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import dayjs from 'dayjs';

import Clipboard from '@react-native-clipboard/clipboard';

import { showAlertModal } from '~components/customs/Modal/Modal';
import Pressable from '~components/customs/Pressable';
import { CircleDollarSign } from '~components/icons';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GetOrderByStatusQuery, OrderStatus } from '~graphql/graphql';
import { useReceivedOrder, useRepayOrder } from '~hooks';
import CheckoutItem from '~screens/CheckoutScreen/components/CheckoutItem';
import { ALERT_TYPE } from '~store/modal/modal.type';
import { OrderDetailScreenNavigationProps } from '~types/navigation.type';

import OrderDetailButton from './components/OrderDetailButton';
import OrderUserInfo from './components/OrderUserInfo';

const OrderDetailScreen = ({ route, navigation }: OrderDetailScreenNavigationProps) => {
  console.log(route.params.id);
  const { onRepayOrder } = useRepayOrder();
  const { onReceivedOrder } = useReceivedOrder();
  const totalItems = useMemo(
    () => route.params.orderItems.reduce((acc, cur) => acc + cur.quantity, 0),
    [route.params.orderItems],
  );

  const renderOrderItem = useCallback(
    ({ item }: { item: GetOrderByStatusQuery['searchOrder'][number]['orderItems'][number] }) => (
      <CheckoutItem
        item={{
          __typename: 'Cart',
          id: item.id,
          hasLab: item.hasLab,
          product: item.product,
          quantity: item.quantity,
        }}
      />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: GetOrderByStatusQuery['searchOrder'][number]['orderItems'][number]) => item.id,
    [],
  );

  const handleRepayOrder = () => {
    if (!route.params.id) return;
    onRepayOrder(+route.params.id);
  };

  const handleReceiveOrder = () => {
    if (!route.params.id) return;
    onReceivedOrder(+route.params.id, true);
  };

  const handleButtonActionPress = () => {
    switch (route.params.status) {
      case OrderStatus.Unpaid:
        return handleRepayOrder();
      case OrderStatus.Paid:
      case OrderStatus.Delivering:
        return;
      case OrderStatus.Delivered:
        return handleReceiveOrder();
      case OrderStatus.Received:
        return navigation.navigate('FeedbackProductScreen', { order: route.params });
      case OrderStatus.Rated:
      case OrderStatus.Unrated:
        return;
      default:
        return 'Unknown Status';
    }
  };

  const handleCopyOrderId = () => {
    Clipboard.setString(btoa(btoa(btoa(btoa(route.params.id)))));
    showAlertModal({
      type: ALERT_TYPE.SUCCESS,
      title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
      message: constants.MESSAGES.ORDER_MESSAGES.COPY_ORDER_PRODUCT_ID,
      autoClose: true,
      autoCloseTime: 1000,
    });
  };

  return (
    <ScrollView
      contentContainerClassName='bg-muted'
      contentContainerStyle={{ flexGrow: 1, gap: 12 }}
      showsVerticalScrollIndicator={false}
    >
      <OrderUserInfo fullName={route.params.fullName} phone={route.params.phone} address={route.params.address} />

      <FlatList
        data={route.params.orderItems}
        keyExtractor={keyExtractor}
        renderItem={renderOrderItem}
        ItemSeparatorComponent={() => <Separator className='bg-muted' />}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
      />

      <View className='flex-row gap-[10px] px-[14px] py-[7px] bg-background'>
        <CircleDollarSign className='text-[#EF4444]' size={24} strokeWidth={1.5} />
        <View className='gap-[9px]'>
          <Text className='font-inter-medium text-foreground text-[12px]'>Payment Option</Text>
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
            {route.params.payment.provider}
          </Text>
        </View>
      </View>

      <View className='gap-[8px] px-[14px] py-[13px] bg-background'>
        <View className='flex-row items-center w-full'>
          <Text className='font-inter-medium text-foreground text-[12px]'>Order ID</Text>
          <Text className='font-inter-medium ml-auto text-foreground text-[12px]'>
            {btoa(btoa(btoa(btoa(route.params.id))))}
          </Text>
          <Pressable className='ml-[6px]' onPress={handleCopyOrderId}>
            <Text className='font-inter-medium text-primary text-[12px]'>COPY</Text>
          </Pressable>
        </View>

        <View className='flex-row items-center justify-between w-full'>
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
            Order Time
          </Text>
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
            {dayjs(route.params.createdAt).format('DD-MM-YYYY HH:mm')}
          </Text>
        </View>

        {route.params.payment?.time && (
          <View className='flex-row items-center justify-between w-full'>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              Payment Time
            </Text>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              {dayjs(route.params.payment.time).format('DD-MM-YYYY HH:mm')}
            </Text>
          </View>
        )}

        {route.params?.shipTime && (
          <View className='flex-row items-center justify-between w-full'>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              Ship Time
            </Text>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              {dayjs(route.params.shipTime).format('DD-MM-YYYY HH:mm')}
            </Text>
          </View>
        )}
      </View>

      <View className='gap-[24px] mt-[4px] p-[24px] bg-background'>
        <View className='flex-row items-center justify-between px-[12px] w-full'>
          <Text className='font-inter-regular text-muted-foreground text-[14px] leading-[20px]'>
            Order ({totalItems} item
            {totalItems > 1 ? 's' : ''})
          </Text>
          <Text className='font-inter-extraBold text-foreground text-[14px]'>
            {route.params.totalPrice.toLocaleString()} ₫
          </Text>
        </View>

        <OrderDetailButton orderStatus={route.params.status} onPress={handleButtonActionPress} />
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
