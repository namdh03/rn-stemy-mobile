import { useCallback } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import dayjs from 'dayjs';
import * as WebBrowser from 'expo-web-browser';

import Clipboard from '@react-native-clipboard/clipboard';
import { useMutation } from '@tanstack/react-query';

import Pressable from '~components/customs/Pressable';
import { CircleDollarSign } from '~components/icons';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetOrderByStatusQuery, OrderStatus } from '~graphql/graphql';
import CheckoutItem from '~screens/CheckoutScreen/components/CheckoutItem';
import { RepayOrderMutation } from '~services/order.services';
import { OrderDetailScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogWarning from '~utils/showDialogWarning';

import OrderDetailButton from './components/OrderDetailButton';
import OrderUserInfo from './components/OrderUserInfo';

const OrderDetailScreen = ({ route, navigation }: OrderDetailScreenNavigationProps) => {
  const { mutate: repayOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(RepayOrderMutation, { orderId }),
  });

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
    showDialogWarning({
      title: 'Reorder Confirmation',
      textBody: 'Your previous payment failed. Do you want to reorder and try paying again?',
      button: 'Reorder Now',
      onPressButton: () =>
        repayOrderMutate(+route.params.id, {
          onSuccess: async (data) => {
            await WebBrowser.openAuthSessionAsync(data.data.repayOrder);
          },
          onError: (errors) => {
            if (isErrors(errors)) {
              const error = errors.find((error) => error.path.includes('repayOrder'));
              if (error?.message) {
                return showDialogError({ textBody: error.message });
              }
            }
            showDialogError();
          },
          onSettled: () => Dialog.hide(),
        }),
    });
  };

  const handleReceiveOrder = () => {
    console.log('handleReceiveOrder');
  };

  const handleButtonActionPress = () => {
    switch (route.params.status) {
      case OrderStatus.Unpaid:
        return handleRepayOrder();
      case OrderStatus.Paid:
        return;
      case OrderStatus.Delivering:
        return handleReceiveOrder();
      case OrderStatus.Delivered:
        return navigation.navigate('FeedbackProductScreen', { order: route.params });
      case OrderStatus.Rated:
        return handleRepayOrder();
      default:
        return 'Unknown Status';
    }
  };

  const handleCopyOrderId = () => {
    Clipboard.setString(route.params.id);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
      textBody: constants.MESSAGES.ORDER_MESSAGES.COPY_ORDER_ID,
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
          <Text className='font-inter-medium ml-auto text-foreground text-[12px]'>{route.params.id}</Text>
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

        {route.params.status === OrderStatus.Paid && (
          <View className='flex-row items-center justify-between w-full'>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              Payment Time
            </Text>
            <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              {dayjs(route.params.payment.time).format('DD-MM-YYYY HH:mm')}
            </Text>
          </View>
        )}

        {route.params.status === OrderStatus.Delivered && (
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
            Order payment ({route.params.orderItems.length} item
            {route.params.orderItems.length > 1 ? 's' : ''})
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
