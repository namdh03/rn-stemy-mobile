import { useMemo } from 'react';
import { Text as RNText, View } from 'react-native';
import dayjs from 'dayjs';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { GetStaffListOrderQuery } from '~graphql/graphql';
import { useStore } from '~store';

export type DeliveryItemProps = {
  item: GetStaffListOrderQuery['listOrders'][number];
  buttonText: string;
  onPress: (orderId: string) => void;
};

const DeliveryItem = ({ item, buttonText, onPress }: DeliveryItemProps) => {
  const user = useStore(useShallow((state) => state.user));
  const totalItems = useMemo(() => item.orderItems.reduce((acc, cur) => acc + cur.quantity, 0), [item.orderItems]);

  return (
    <View className='py-[16px] bg-background rounded-[6px]'>
      <View className='px-[16px]'>
        <View className='flex-row justify-between items-center'>
          <Text className='font-inter-semiBold text-foreground text-[14px]'>{user?.fullName}</Text>
          <Text className='font-inter-regular text-muted-foreground text-[12px]'>
            ID: {btoa(btoa(btoa(btoa(item.id))))}
          </Text>
        </View>

        <Text className=''>{dayjs(item.createdAt).format('DD/MM/YYYY')}</Text>
      </View>

      <Separator className='my-[8px] bg-muted' />

      <View className='px-[16px]'>
        <Text className='font-inter-semiBold text-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
          Customer name:{' '}
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
            {item.fullName}
          </Text>
        </Text>

        <Text className='font-inter-semiBold text-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
          SĐT:{' '}
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
            {item.phone}
          </Text>
        </Text>

        <Text className='font-inter-semiBold text-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
          Address:{' '}
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[24px] tracking-[-0.144px]'>
            {item.address}
          </Text>
        </Text>
      </View>

      <Separator className='my-[8px] bg-muted' />

      <View className='flex-row justify-between w-full px-[25px] py-[8px]'>
        <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[20px]'>
          {totalItems} item
          {totalItems > 1 ? 's' : ''}
        </Text>
        <Text className='font-inter-semiBold text-foreground text-[14px] leading-[20px]'>
          Order Total:
          <Text className='font-inter-regular text-primary text-[14px] leading-[20px]'>
            {' '}
            {item.totalPrice.toLocaleString()} ₫
          </Text>
        </Text>
      </View>

      <View className='ml-auto px-[16px]'>
        <Button className='min-w-[100px]' onPress={onPress.bind(null, item.id)} size='sm'>
          <RNText className='font-inter-semiBold text-primary-foreground text-[12px]'>{buttonText}</RNText>
        </Button>
      </View>
    </View>
  );
};

export default DeliveryItem;
