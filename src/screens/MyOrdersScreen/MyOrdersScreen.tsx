import { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import OrderItem from '~components/customs/OrderItem';
import OrderItemSkeleton from '~components/customs/OrderItemSkeleton'; // Import the skeleton component
import SearchName from '~components/customs/SearchName';
import { Tabs, TabsList } from '~components/ui/tabs';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetOrderByStatusQuery as GetOrderByStatusQueryType, OrderStatus } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetOrderByStatusQuery } from '~services/order.services';
import { MyOrdersScreenNavigationProps } from '~types/navigation.type';

import EmptyOrderList from './components/EmptyOrderList';
import TabButton from './components/TabButton';

const MyOrdersScreen = ({ route, navigation }: MyOrdersScreenNavigationProps) => {
  const [tab, setTab] = useState(route.params.orderStatus);
  const {
    data: orderListByStatus,
    refetch: orderListByOrderRefetch,
    isLoading,
    error,
  } = useQuery({
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

  console.log(orderListByStatus, JSON.stringify(error));

  const handleNavigateToSearchOrder = useCallback(() => {
    navigation.navigate('SearchOrdersScreen');
  }, [navigation]);

  const handleSetTab = useCallback((text: string) => {
    setTab(text as OrderStatus);
  }, []);

  const renderOrderItem = useCallback(
    ({ item }: { item: GetOrderByStatusQueryType['searchOrder'][number] }) => <OrderItem order={item} />,
    [],
  );

  const keyExtractor = useCallback((item: GetOrderByStatusQueryType['searchOrder'][number]) => item.id, []);

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
        className='mt-[12px] mb-[16px] px-[4px] w-full mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full bg-background rounded-[6px]'>
          <TabButton value={OrderStatus.Unpaid} currentTab={tab} onPress={handleSetTab} label='To Pay' />
          <TabButton value={OrderStatus.Paid} currentTab={tab} onPress={handleSetTab} label='To Ship' />
          <TabButton value={OrderStatus.Delivering} currentTab={tab} onPress={handleSetTab} label='To Receive' />
          <TabButton value={OrderStatus.Delivered} currentTab={tab} onPress={handleSetTab} label='To Rate' />
        </TabsList>
      </Tabs>

      {isLoading ? (
        <FlatList
          data={[...Array(5)]}
          renderItem={() => <OrderItemSkeleton />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          className='flex-1'
          contentContainerStyle={{ gap: 16, paddingBottom: 50 }}
        />
      ) : orderListByStatusSorted.length === 0 ? (
        <EmptyOrderList />
      ) : (
        <FlatList
          data={orderListByStatusSorted}
          keyExtractor={keyExtractor}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} tintColor='#your-primary-color' />
          }
          className='flex-1'
          contentContainerStyle={{ gap: 16, paddingBottom: 50 }}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          windowSize={21}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default memo(MyOrdersScreen);
