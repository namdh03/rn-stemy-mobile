import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import SearchName from '~components/customs/SearchName';
import { FILTER_AND_SORTING_PRODUCT_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
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
  const { data } = useQuery({
    queryKey: [FILTER_AND_SORTING_PRODUCT_QUERY_KEY, storesFilterSorting],
    queryFn: () => execute(FilterAndSortingProductQuery, storesFilterSorting),
    select: (data) => data.data.products.items,
  });

  console.log(data);

  return (
    <View className='flex-1 px-[25px] mx-auto w-full max-w-xl'>
      <SearchName editable={false} value={storesFilterSorting.search} onContainerPress={() => navigation.goBack()} />
    </View>
  );
};

export default StoresScreen;
