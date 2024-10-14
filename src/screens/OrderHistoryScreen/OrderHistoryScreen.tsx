import { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { useQuery } from '@tanstack/react-query';

import EmptyList from '~components/customs/EmptyList';
import OrderItem from '~components/customs/OrderItem';
import OrderItemSkeleton from '~components/customs/OrderItemSkeleton';
import SearchName from '~components/customs/SearchName';
import execute from '~graphql/execute';
import { GetHistoryOrderQuery as GetHistoryOrderQueryType } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetHistoryOrderQuery } from '~services/order.services';
import { OrderHistoryScreenNavigationProps } from '~types/navigation.type';

const OrderHistoryScreen = ({ navigation }: OrderHistoryScreenNavigationProps) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => execute(GetHistoryOrderQuery),
    select: (data) => data.data.searchOrder,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const orderListSorted = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [data]);

  const handleNavigateToSearchOrder = useCallback(() => {
    navigation.navigate('SearchOrdersScreen');
  }, [navigation]);

  const renderOrderItem = useCallback(
    ({ item }: { item: GetHistoryOrderQueryType['searchOrder'][number] }) => <OrderItem order={item} />,
    [],
  );

  const keyExtractor = useCallback((item: GetHistoryOrderQueryType['searchOrder'][number]) => item.id, []);

  return (
    <View className='flex-1 mx-auto w-full max-w-xl bg-muted'>
      <View className='px-[25px] pb-[14px]'>
        <SearchName
          editable={false}
          placeholder='Search Product Name or Order ID'
          onContainerPress={handleNavigateToSearchOrder}
          active
        />
      </View>

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
      ) : data?.length === 0 ? (
        <EmptyList
          message={`You haven't placed any orders yet. Start exploring and shop your favorite STEM kits now!`}
        />
      ) : (
        <FlatList
          data={orderListSorted}
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

export default OrderHistoryScreen;
