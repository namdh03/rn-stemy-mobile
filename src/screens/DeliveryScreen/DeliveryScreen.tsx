import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetStaffListOrderQuery } from '~services/order.services';

import DeliveryList from './components/DeliveryList';

const DeliveryScreen = () => {
  const [value, setValue] = useState<OrderStatus>(OrderStatus.Paid);
  const { data, refetch, isLoading } = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.GET_STAFF_LIST_ORDER_QUERY, value],
    queryFn: () => execute(GetStaffListOrderQuery, { status: value }),
    select: (data) => data.data.listOrders,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const listSorted = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const dateA = new Date(b.createdAt).getTime();
      const dateB = new Date(a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [data]);

  return (
    <View className='gap-[16px] p-[25px] py-[30px] mx-auto w-full max-w-xl bg-muted'>
      <Tabs
        value={value}
        onValueChange={(value) => setValue(value as OrderStatus)}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full bg-[#16A34A1A]'>
          <TabsTrigger value={OrderStatus.Paid} className='flex-1'>
            <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
              To Ship
            </Text>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.Delivering} className='flex-1'>
            <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
              To Receive
            </Text>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={OrderStatus.Paid} className='mt-[14px] h-full'>
          <DeliveryList
            isLoading={isLoading}
            data={listSorted}
            isRefetch={isRefetchingByUser}
            refetch={refetchByUser}
            status={value}
          />
        </TabsContent>

        <TabsContent value={OrderStatus.Delivering} className='mt-[14px] h-full'>
          <DeliveryList
            isLoading={isLoading}
            data={listSorted}
            isRefetch={isRefetchingByUser}
            refetch={refetchByUser}
            status={value}
          />
        </TabsContent>
      </Tabs>
    </View>
  );
};

export default DeliveryScreen;
