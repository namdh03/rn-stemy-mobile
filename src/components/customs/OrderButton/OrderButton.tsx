import { useMemo } from 'react';
import { Text as RNText, View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { OrderStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';
import { getOrderStatusButtonText, getOrderStatusDescription } from '~utils/getOrderItemText';

interface OrderButtonProps {
  orderStatus: OrderStatus;
  onPress: () => void;
  onBuyAgain: () => void;
}

const OrderButton = ({ orderStatus, onPress, onBuyAgain }: OrderButtonProps) => {
  const inactive = useMemo(
    () => orderStatus === OrderStatus.Paid || orderStatus === OrderStatus.Delivering,
    [orderStatus],
  );

  return (
    <View className='w-full flex-row justify-between items-center mt-[8px]'>
      <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
        {getOrderStatusDescription(orderStatus)}
      </Text>
      <View className='flex-row gap-[10px] items-center'>
        {orderStatus === OrderStatus.Received && (
          <Button variant='outline' className='min-w-[100px]' size='sm' onPress={onBuyAgain}>
            <RNText className='font-inter-semiBold text-muted-foreground text-[12px]'>Buy again</RNText>
          </Button>
        )}

        <Button
          className={cn('min-w-[100px]', {
            'bg-border': inactive,
          })}
          onPress={onPress}
          disabled={inactive}
          size='sm'
        >
          <RNText
            className={cn('font-inter-semiBold text-primary-foreground text-[12px]', {
              'text-muted-foreground': inactive,
            })}
          >
            {getOrderStatusButtonText(orderStatus)}
          </RNText>
        </Button>
      </View>
    </View>
  );
};

export default OrderButton;
