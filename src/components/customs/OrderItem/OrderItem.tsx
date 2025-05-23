import { useMemo } from 'react';
import { Text as RNText, View } from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { OrderStatus, SearchOrderQuery } from '~graphql/graphql';
import { useReceivedOrder, useReOrder, useRepayOrder } from '~hooks';
import { RootStackParamList } from '~types/navigation.type';
import { getOrderStatusLabel } from '~utils/getOrderItemText';

import OrderButton from '../OrderButton';
import Pressable from '../Pressable';

interface OrderItemProps {
  order: SearchOrderQuery['searchOrder'][number];
}

const OrderItem = ({ order }: OrderItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { onRepayOrder } = useRepayOrder();
  const { onReceivedOrder } = useReceivedOrder();
  const { onReOrder } = useReOrder();
  const firstOrderItem = useMemo(() => order.orderItems[0], [order]);
  const totalItems = useMemo(() => order.orderItems.reduce((acc, cur) => acc + cur.quantity, 0), [order.orderItems]);
  const handleNavigateToOrderDetail = () => {
    navigation.navigate('OrderDetailScreen', order);
  };

  const handleRepayOrder = () => {
    if (!order.id) return;
    onRepayOrder(+order.id);
  };

  const handleReceiveOrder = () => {
    if (!order.id) return;
    onReceivedOrder(+order.id);
  };

  const handleBuyOrderAgain = () => {
    if (!order.id) return;
    onReOrder(+order.id);
  };

  const handleButtonActionPress = () => {
    switch (order.status) {
      case OrderStatus.Unpaid:
        return handleRepayOrder();
      case OrderStatus.Paid:
        return;
      case OrderStatus.Delivering:
        return;
      case OrderStatus.Delivered:
        return handleReceiveOrder();
      case OrderStatus.Received:
        return navigation.navigate('FeedbackProductScreen', { order });
      case OrderStatus.Rated:
      case OrderStatus.Unrated:
        return handleBuyOrderAgain();
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
            {(firstOrderItem.hasLab
              ? firstOrderItem.productPrice + firstOrderItem.labPrice
              : firstOrderItem.productPrice
            ).toLocaleString()}
            ₫
          </Text>
        </View>
      </View>

      <Separator className='bg-muted' />

      <Button className='w-full' variant='ghost' onPress={handleNavigateToOrderDetail}>
        <RNText className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
          View more product
        </RNText>
      </Button>

      <Separator className='bg-muted' />

      <View className='flex-row justify-between w-full px-[25px] py-[8px]'>
        <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
          {totalItems} item
          {totalItems > 1 ? 's' : ''}
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
