import { memo, useCallback, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import EmptyList from '~components/customs/EmptyList';
import OrderItem from '~components/customs/OrderItem';
import OrderItemSkeleton from '~components/customs/OrderItemSkeleton';
import SearchName from '~components/customs/SearchName';
import { Tabs, TabsList } from '~components/ui/tabs';
import { GetOrderByStatusQuery as GetOrderByStatusQueryType, OrderStatus } from '~graphql/graphql';
import { useOrderList, useRefreshByUser } from '~hooks';
import { MyOrdersScreenNavigationProps } from '~types/navigation.type';

import TabButton from './components/TabButton';

const MyOrdersScreen = ({ route, navigation }: MyOrdersScreenNavigationProps) => {
  const [tab, setTab] = useState(route.params.orderStatus[0]);
  const { data, refetch, isLoading } = useOrderList(tab);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

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
          <TabButton value={OrderStatus.Delivered} currentTab={tab} onPress={handleSetTab} label='To Receive' />
          <TabButton value={OrderStatus.Received} currentTab={tab} onPress={handleSetTab} label='To Rate' />
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
      ) : data.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        >
          <EmptyList message={`You don't have any orders in this category.`} />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
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
