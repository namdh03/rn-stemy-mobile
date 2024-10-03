import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useInfiniteQuery } from '@tanstack/react-query';

import ProductCard from '~components/customs/ProductCard';
import ProductCardSkeleton from '~components/customs/ProductCardSkeleton';
import SearchName from '~components/customs/SearchName';
import constants from '~constants';
import { FILTER_AND_SORTING_PRODUCT_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
import { useRefreshByUser } from '~hooks';
import { FilterAndSortingProductQuery } from '~services/product.services';
import { useStore } from '~store';
import { StoresScreenNavigationProps } from '~types/navigation.type';

const StoresScreen = ({ navigation }: StoresScreenNavigationProps) => {
  const { storesFilterSorting } = useStore(
    useShallow((state) => ({
      storesFilterSorting: state.storesFilterSorting,
      setFilterStoring: state.setFilterStoring,
    })),
  );
  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: [FILTER_AND_SORTING_PRODUCT_QUERY_KEY, storesFilterSorting],
    queryFn: ({ pageParam = constants.FILTER_SORTING.DEFAULT_CURRENT_PAGE }) =>
      execute(FilterAndSortingProductQuery, {
        ...storesFilterSorting,
        currentPage: pageParam,
      }),
    initialPageParam: constants.FILTER_SORTING.DEFAULT_CURRENT_PAGE,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.products?.items && lastPage.data.products.items.length > 0) {
        return allPages.length + 1;
      }
      return undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data.products.items),
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const handleNavigateToSearchProductScreen = () => {
    navigation.navigate('SearchProductScreen');
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View className='flex-1 gap-[20px] px-[25px] mx-auto w-full max-w-xl'>
      <SearchName
        editable={false}
        value={storesFilterSorting.search}
        onContainerPress={handleNavigateToSearchProductScreen}
      />
      {isLoading ? (
        <FlatList
          data={Array(constants.FILTER_SORTING.DEFAULT_CURRENT_ITEM / 2).fill(0)}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={() => (
            <View className='w-1/2 flex-shrink-0 pl-[13px]'>
              <ProductCardSkeleton />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerClassName='gap-y-[23px] ml-[-13px] pb-[40px]'
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View className='w-1/2 flex-shrink-0 pl-[13px]'>
              <ProductCard
                id={item.id}
                imageUrl={item.images[0]?.url}
                numOfReviews={item.feedbacks?.length || 0}
                price={item.price}
                rating={item.rating}
                title={item.name}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentContainerClassName='gap-y-[23px] ml-[-13px] pb-[40px]'
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator className='text-primary' size='small' /> : null}
          refreshControl={
            <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
          }
        />
      )}
    </View>
  );
};

export default StoresScreen;
