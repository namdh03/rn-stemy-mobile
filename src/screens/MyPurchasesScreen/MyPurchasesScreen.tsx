import React from 'react';
import { FlatList, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { useQuery } from '@tanstack/react-query';

import LabList from '~components/customs/LabList';
import SearchName from '~components/customs/SearchName';
import { GET_USER_LABS_IN_ORDER_QUERY_KEY } from '~constants/lab-query-key';
import execute from '~graphql/execute';
import { GetMyPurchasesQuery as GetMyPurchasesQueryType } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetMyPurchasesQuery } from '~services/lab.services';

const MyPurchasesScreen = () => {
  const { data, refetch } = useQuery({
    queryKey: [GET_USER_LABS_IN_ORDER_QUERY_KEY],
    queryFn: () => execute(GetMyPurchasesQuery, { search: '' }),
    select: (data) => data.data.searchOrder,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const renderItem = ({ item }: { item: GetMyPurchasesQueryType['searchOrder'][number] }) => {
    return (
      <View className='w-full'>
        <LabList data={item} />
      </View>
    );
  };

  return (
    <View className='flex-1 w-full max-w-xl bg-muted '>
      <View className='px-[25px]'>
        <SearchName
          editable={false}
          placeholder='Search Product Name or Order ID'
          // onContainerPress={handleNavigateToSearchOrder}
          active
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        // keyExtractor={(item) => item.orderId}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} tintColor='#your-primary-color' />
        }
      />
    </View>
  );
};

export default MyPurchasesScreen;
