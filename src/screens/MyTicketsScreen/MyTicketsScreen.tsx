import { useCallback } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { GetMyTicketsQuery as GetMyTicketsQueryType } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetMyTicketsQuery } from '~services/ticket.services';

import Ticket from './components/Ticket';

const MyTicketsScreen = () => {
  const { data, refetch } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_MY_TICKET_QUERY_KEY],
    queryFn: () => execute(GetMyTicketsQuery),
    select: (data) => data.data.myTickets,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderOrderItem = useCallback(
    ({ item, index }: { item: GetMyTicketsQueryType['myTickets'][number]; index: number }) => (
      <Ticket index={index} item={item} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: GetMyTicketsQueryType['myTickets'][number]) => item.id, []);

  return (
    <View className='flex-1 px-[25px] py-[35px] mx-auto w-full max-w-xl bg-muted'>
      <FlatList
        data={data}
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
    </View>
  );
};

export default MyTicketsScreen;
