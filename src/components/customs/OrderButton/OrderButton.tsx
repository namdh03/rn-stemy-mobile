import { useMemo } from 'react';
import { Text as RNText, View } from 'react-native';

import { Button } from '~components/ui/button';
import { OrderStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';
import { getOrderStatusButtonText } from '~utils/getOrderItemText';

interface OrderButtonProps {
  orderStatus: OrderStatus;
  onPress: () => void;
  onBuyAgain: () => void;
}

const OrderButton = ({ orderStatus, onPress, onBuyAgain }: OrderButtonProps) => {
  const inactive = useMemo(() => orderStatus === OrderStatus.Paid, [orderStatus]);

  return (
    <View className='w-full flex-row gap-[10px]'>
      {orderStatus === OrderStatus.Delivered && (
        <Button variant='outline' className='mt-[8px] min-w-[100px]' size='sm' onPress={onBuyAgain}>
          <RNText className='font-inter-semiBold text-muted-foreground text-[12px]'>Buy again</RNText>
        </Button>
      )}

      <Button
        className={cn('mt-[8px] min-w-[100px]', {
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
  );
};

export default OrderButton;
