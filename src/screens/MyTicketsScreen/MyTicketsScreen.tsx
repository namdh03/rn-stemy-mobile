import { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import EmptyList from '~components/customs/EmptyList';
import Ticket, { TicketProps } from '~components/customs/Ticket';
import TicketSkeleton from '~components/customs/TicketSkeleton';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetMyTicketsQuery as GetMyTicketsQueryType } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetMyTicketsQuery } from '~services/ticket.services';
import { MyTicketsScreenNavigationProps } from '~types/navigation.type';

const MyTicketsScreen = ({ navigation }: MyTicketsScreenNavigationProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_MY_TICKET_QUERY_KEY],
    queryFn: () => execute(GetMyTicketsQuery),
    select: (data) => data.data.myTickets,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const listSorted = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const dateA = new Date(b.createdAt).getTime();
      const dateB = new Date(a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [data]);

  const handleNavigationToTicketDetail = ({ index, item }: Omit<TicketProps, 'onPress'>) => {
    navigation.navigate('TicketDetailScreen', { index, ticketId: item.id });
  };

  const renderTicketItem = useCallback(
    ({ item, index }: { item: GetMyTicketsQueryType['myTickets'][number]; index: number }) => (
      <Ticket index={index} item={item} onPress={handleNavigationToTicketDetail.bind(null, { index, item })} />
    ),
    [handleNavigationToTicketDetail],
  );

  const keyExtractor = useCallback((item: GetMyTicketsQueryType['myTickets'][number]) => item.id, []);

  return (
    <View className='flex-1 px-[25px] py-[35px] mx-auto w-full max-w-xl bg-muted'>
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
      ) : listSorted.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        >
          <EmptyList
            message={`You have no support tickets. If you encounter any issues, feel free to create a new ticket.`}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderTicketItem}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
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

export default MyTicketsScreen;
