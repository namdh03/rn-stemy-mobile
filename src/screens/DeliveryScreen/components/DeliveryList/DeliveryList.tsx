import { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import EmptyList from '~components/customs/EmptyList';
import { GetStaffListOrderQuery, OrderStatus } from '~graphql/graphql';

import DeliveryItem from '../DeliveryItem';
import DeliverySkeleton from '../DeliverySkeleton';

interface DeliveryListProps {
  isLoading: boolean;
  data: GetStaffListOrderQuery['listOrders'];
  isRefetch: boolean;
  refetch: () => Promise<void>;
  status: OrderStatus;
}

const DeliveryList = ({ isLoading, data, isRefetch, refetch, status }: DeliveryListProps) => {
  // Handle order button text based on status
  const handleOrderButtonPress = useCallback(() => {
    switch (status) {
      case OrderStatus.Paid:
        return 'Pick up';
      case OrderStatus.Delivering:
        return 'Delivered';
      default:
        return '';
    }
  }, [status]);

  // Render the delivery item with memoized callback
  const renderDeliveryItem = useCallback(
    ({ item }: { item: GetStaffListOrderQuery['listOrders'][number] }) => {
      const buttonText = handleOrderButtonPress();

      const handlePress = () => {
        if (status === OrderStatus.Paid) {
          // Execute pick-up logic
        } else if (status === OrderStatus.Delivering) {
          // Execute delivery logic
        }
      };

      return <DeliveryItem item={item} buttonText={buttonText} onPress={handlePress} />;
    },
    [handleOrderButtonPress, status],
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: GetStaffListOrderQuery['listOrders'][number]) => item.id, []);

  // Predefine number of skeletons for loading state
  const skeletonItems = useMemo(() => [...Array(5)], []);

  return (
    <View className='flex-1 mx-auto w-full max-w-xl h-full pb-[180px]'>
      {isLoading ? (
        <FlatList
          data={skeletonItems}
          renderItem={() => <DeliverySkeleton />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          className='flex-1'
          contentContainerStyle={{ gap: 16, paddingBottom: 50 }}
        />
      ) : data.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} />}
        >
          <EmptyList message={`You have no orders to deliver.`} />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderDeliveryItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} />}
          className='flex-1'
          contentContainerStyle={{ gap: 24, paddingBottom: 50 }}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          windowSize={21}
          onEndReachedThreshold={0.5}
          getItemLayout={(_, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />
      )}
    </View>
  );
};

export default DeliveryList;
