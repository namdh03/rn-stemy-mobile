import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import OrderItem from '~components/customs/OrderItem';
import SearchName from '~components/customs/SearchName';
import { Tabs, TabsList, TabsTrigger } from '~components/ui/tabs';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetOrderByStatusQuery } from '~services/order.services';
import { MyOrdersScreenNavigationProps } from '~types/navigation.type';

const MyOrdersScreen = ({ route, navigation }: MyOrdersScreenNavigationProps) => {
  const [tab, setTab] = useState(route.params.orderStatus);
  const handleNavigateToSearchOrder = () => {
    navigation.navigate('SearchOrdersScreen');
  };
  const { data: orderListByStatus, refetch: orderListByOrderRefetch } = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, tab],
    queryFn: () => execute(GetOrderByStatusQuery, { status: tab }),
    select: (data) => data.data.searchOrder,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(orderListByOrderRefetch);
  const orderListByStatusSorted = useMemo(() => {
    return [...(orderListByStatus || [])].sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [orderListByStatus]);

  const handleSetTab = (text: string) => {
    setTab(text as OrderStatus);
  };

  return (
    <View className='flex-1 mx-auto w-full max-w-xl bg-muted'>
      <View className='px-[25px]'>
        <SearchName
          editable={false}
          placeholder='Search Product Name or Order ID'
          onContainerPress={handleNavigateToSearchOrder}
          active
        />
      </View>

      <Tabs
        value={tab}
        onValueChange={handleSetTab}
        className='mt-[12px] mb-[16px] w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value={OrderStatus.Unpaid} className='flex-1'>
            <Text>To Pay</Text>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.Paid} className='flex-1'>
            <Text>To Ship</Text>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.Delivering} className='flex-1'>
            <Text>To Receive</Text>
          </TabsTrigger>
          <TabsTrigger value={OrderStatus.Delivered} className='flex-1'>
            <Text>To Rate</Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <FlatList
        data={orderListByStatusSorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem order={item} />}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        refreshControl={
          <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
        className='flex-1'
        contentContainerClassName='gap-[16px] pb-[50px]'
      />
    </View>
  );
};

export default MyOrdersScreen;
