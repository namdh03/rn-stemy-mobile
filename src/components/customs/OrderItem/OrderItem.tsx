import { useMemo } from 'react';
import { Text as RNText, View } from 'react-native';
import { Dialog } from 'react-native-alert-notification';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';

import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus, SearchOrderQuery } from '~graphql/graphql';
import { RepayOrderMutation } from '~services/order.services';
import { MainStackParamList } from '~types/navigation.type';
import { getOrderStatusLabel } from '~utils/getOrderItemText';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogWarning from '~utils/showDialogWarning';

import OrderButton from '../OrderButton';
import Pressable from '../Pressable';

interface OrderItemProps {
  order: SearchOrderQuery['searchOrder'][number];
}

const OrderItem = ({ order }: OrderItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const firstOrderItem = useMemo(() => order.orderItems[0], [order]);
  const { mutate: repayOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(RepayOrderMutation, { orderId }),
  });

  const handleNavigateToOrderDetail = () => {
    navigation.navigate('OrderDetailScreen', order);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRepayOrder = () => {
    if (!order.id) return;
    showDialogWarning({
      title: 'Reorder Confirmation',
      textBody: 'Your previous payment failed. Do you want to reorder and try paying again?',
      button: 'Reorder Now',
      onPressButton: () =>
        repayOrderMutate(+order.id, {
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

  const handleBuyOrderAgain = () => {
    console.log('handleBuyOrderAgain');
  };

  const handleReceiveOrder = () => {
    console.log('handleReceiveOrder');
  };

  const handleButtonActionPress = () => {
    switch (order.status) {
      case OrderStatus.Unpaid:
        // return handleRepayOrder();
        return navigation.navigate('FeedbackProductScreen', { order });
      case OrderStatus.Paid:
        return;
      case OrderStatus.Delivering:
        return handleReceiveOrder();
      case OrderStatus.Delivered:
        return navigation.navigate('FeedbackProductScreen', { order });
      case OrderStatus.Rated:
        return;
      default:
        return 'Unknown Status';
    }
  };

  return (
    <Pressable className='py-[14px] bg-background' onPress={handleNavigateToOrderDetail}>
      <View className='flex-row justify-between items-center w-full px-[25px]'>
        <Text className='font-inter-semiBold text-foreground text-[14px]'>
          {dayjs(order.createdAt).format('DD-MM-YYYY')}
        </Text>
        <Text className='font-inter-medium text-primary text-[14px]'>{getOrderStatusLabel(order.status)}</Text>
      </View>

      <View className='flex-row items-center mt-[16px] mb-[8px] px-[25px]'>
        <Image
          source={firstOrderItem.product.images[0]?.url}
          placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
          style={{ width: 72, height: 72, alignSelf: 'center', borderRadius: 4 }}
          contentFit='cover'
        />
        <View className='flex-1 items-start ml-[12px]'>
          <Text numberOfLines={1} className='font-inter-medium text-foreground text-[12px]'>
            {firstOrderItem.product.name}
          </Text>

          <View className='flex-row items-center justify-between w-full'>
            <Text className='font-inter-regular mt-[8px] text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
              {firstOrderItem.hasLab ? 'Lab included' : 'No Lab'}
            </Text>
            <Text className='font-inter-medium mt-[5px] text-foreground text-[12px]'>x{firstOrderItem.quantity}</Text>
          </View>

          <Text className='font-inter-medium mt-[11px] w-full text-right text-foreground text-[14px] break-words flex-shrink'>
            {(
              (firstOrderItem.hasLab
                ? firstOrderItem.productPrice + firstOrderItem.labPrice
                : firstOrderItem.productPrice) * firstOrderItem.quantity
            ).toLocaleString()}
            ₫
          </Text>
        </View>
      </View>

      <Separator className='bg-muted' />

      <Button className='w-full' variant='ghost'>
        <RNText className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
          View more product
        </RNText>
      </Button>

      <Separator className='bg-muted' />

      <View className='flex-row justify-between w-full px-[25px] py-[8px]'>
        <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
          {order.orderItems.length} item
          {order.orderItems.length > 1 ? 's' : ''}
        </Text>
        <Text className='font-inter-semiBold text-foreground text-[14px] leading-[20px]'>
          Order Total:
          <Text className='font-inter-regular text-primary text-[14px] leading-[20px]'>
            {' '}
            {order.totalPrice.toLocaleString()} ₫
          </Text>
        </Text>
      </View>

      <Separator className='bg-muted' />

      <View className='ml-auto px-[25px]'>
        <OrderButton orderStatus={order.status} onPress={handleButtonActionPress} onBuyAgain={handleBuyOrderAgain} />
      </View>
    </Pressable>
  );
};

export default OrderItem;
