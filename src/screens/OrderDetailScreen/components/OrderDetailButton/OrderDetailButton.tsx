import { useMemo } from 'react';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { OrderStatus } from '~graphql/graphql';
import { getOrderStatusButtonText } from '~utils/getOrderItemText';

interface OrderDetailButtonProps {
  orderStatus: OrderStatus;
  onPress?: () => void;
}

const OrderDetailButton = ({ orderStatus, onPress }: OrderDetailButtonProps) => {
  const inactive = useMemo(
    () => orderStatus === OrderStatus.Paid || orderStatus === OrderStatus.Delivering,
    [orderStatus],
  );

  return (
    <Button className={inactive ? 'bg-border' : ''} size='lg' onPress={onPress} disabled={inactive}>
      <Text className={inactive ? 'text-muted-foreground' : ''}>{getOrderStatusButtonText(orderStatus)}</Text>
    </Button>
  );
};

export default OrderDetailButton;
