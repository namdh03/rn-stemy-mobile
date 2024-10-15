import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

import { useQuery } from '@tanstack/react-query';

import EmptyList from '~components/customs/EmptyList';
import LabComponentSkeleton from '~components/customs/LabComponentSkeleton';
import LabList from '~components/customs/LabList';
import SearchName from '~components/customs/SearchName';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetMyPurchasesQuery as GetMyPurchasesQueryType } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetMyPurchasesQuery } from '~services/lab.services';
import { MyPurchasesScreenNavigationProps } from '~types/navigation.type';

const MyPurchasesScreen = ({ navigation }: MyPurchasesScreenNavigationProps) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: [constants.PURCHASES_QUERY_KEY.GET_USER_LABS_IN_ORDER_QUERY_KEY],
    queryFn: () => execute(GetMyPurchasesQuery, { search: '' }),
    select: (data) => data.data.searchOrder,
  });

  const handleNavigateToSearchMyPurchases = useCallback(() => {
    navigation.navigate('SearchMyPurchasesScreen');
  }, [navigation]);

  const orderListSorted = useMemo(() => {
    return [...(data || [])].sort((a, b) => {
      const dateA = new Date(b.createdAt).getTime();
      const dateB = new Date(a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [data]);

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
          onContainerPress={handleNavigateToSearchMyPurchases}
          active
        />
      </View>

      {isLoading ? (
        <FlatList
          data={[...Array(5)]}
          renderItem={() => <LabComponentSkeleton />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
      ) : data?.length === 0 ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} tintColor='#your-primary-color' />
          }
        >
          <EmptyList message={`You haven't made any purchases yet. Start shopping now!`} />
        </ScrollView>
      ) : (
        <FlatList
          data={orderListSorted}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} tintColor='#your-primary-color' />
          }
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
      )}
    </View>
  );
};

export default MyPurchasesScreen;
