import { useCallback } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import EmptyList from '~components/customs/EmptyList';
import Ticket from '~components/customs/Ticket';
import TicketSkeleton from '~components/customs/TicketSkeleton';
import { GetStaffTicketsByStatusQuery } from '~graphql/graphql';

interface TicketListProps {
  isLoading: boolean;
  data: GetStaffTicketsByStatusQuery['myTickets'];
  isRefetch: boolean;
  refetch: () => Promise<void>;
}

const TicketList = ({ isLoading, data, isRefetch, refetch }: TicketListProps) => {
  const renderOrderItem = useCallback(
    ({ item, index }: { item: GetStaffTicketsByStatusQuery['myTickets'][number]; index: number }) => (
      <Ticket index={index} item={item} onPress={() => {}} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: GetStaffTicketsByStatusQuery['myTickets'][number]) => item.id, []);

  return (
    <View className='flex-1 mx-auto w-full max-w-xl'>
      {isLoading ? (
        <FlatList
          data={[...Array(5)]}
          renderItem={() => <TicketSkeleton />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          className='flex-1'
          contentContainerStyle={{ gap: 16, paddingBottom: 50 }}
        />
      ) : data.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} tintColor='#your-primary-color' />}
        >
          <EmptyList
            message={`You have no support tickets. If you encounter any issues, feel free to create a new ticket.`}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} tintColor='#your-primary-color' />}
          className='flex-1'
          contentContainerStyle={{ gap: 24, paddingBottom: 50 }}
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

export default TicketList;
