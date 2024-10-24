import { useCallback } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import EmptyList from '~components/customs/EmptyList';
import Ticket, { TicketProps } from '~components/customs/Ticket';
import TicketSkeleton from '~components/customs/TicketSkeleton';
import { GetStaffTicketsByStatusQuery, TicketStatus } from '~graphql/graphql';
import { StaffStackParamList } from '~types/navigation.type';

interface TicketListProps {
  isLoading: boolean;
  data: GetStaffTicketsByStatusQuery['myTickets'];
  isRefetch: boolean;
  refetch: () => Promise<void>;
  status: TicketStatus;
}

const TicketList = ({ isLoading, data, isRefetch, refetch, status }: TicketListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<StaffStackParamList>>();

  const handleNavigationToSupportTicketDetail = ({ index, item }: Omit<TicketProps, 'onPress'>) => {
    navigation.navigate('SupportTicketDetailScreen', { index, ticketId: item.id, status });
  };

  const renderTicketItem = useCallback(
    ({ item, index }: { item: GetStaffTicketsByStatusQuery['myTickets'][number]; index: number }) => (
      <Ticket index={index} item={item} onPress={handleNavigationToSupportTicketDetail.bind(null, { index, item })} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: GetStaffTicketsByStatusQuery['myTickets'][number]) => item.id, []);

  return (
    <View className='flex-1 mx-auto w-full max-w-xl h-full pb-[180px]'>
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
          refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} />}
        >
          <EmptyList message={`You have no support tickets.`} />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderTicketItem}
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
        />
      )}
    </View>
  );
};

export default TicketList;
