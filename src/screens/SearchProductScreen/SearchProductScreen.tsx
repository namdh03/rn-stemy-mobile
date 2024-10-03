import { useCallback, useState } from 'react';
import { Keyboard, Pressable as RNPressable, ScrollView, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import ProductList from '~components/customs/ProductList';
import SearchName from '~components/customs/SearchName';
import { GET_FEATURED_PRODUCT_QUERY_KEY, SEARCH_PRODUCT_BY_NAME_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
import { Product } from '~graphql/graphql';
import { useColorScheme, useDebounce } from '~hooks';
import { GetFeaturedProductQuery, SearchProductByNameQuery } from '~services/product.services';
import { useHistorySearchProductStore, useStore } from '~store';
import { SearchProductScreenNavigationProps } from '~types/navigation.type';

import NoResultsMessage from './components/NoResultsMessage';
import RecentlySearched from './components/RecentlySearched';
import SearchSuggestions from './components/SearchSuggestions';

const SearchProductScreen = ({ navigation }: SearchProductScreenNavigationProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const { data: featuredProduct } = useQuery({
    queryKey: [GET_FEATURED_PRODUCT_QUERY_KEY],
    queryFn: () => execute(GetFeaturedProductQuery),
    select: (data) => data.data.products.items,
  });
  const { data: searchProductNameList, isFetching: isSearchProductNameListFetching } = useQuery({
    queryKey: [SEARCH_PRODUCT_BY_NAME_QUERY_KEY, debouncedSearchValue],
    queryFn: () => execute(SearchProductByNameQuery, { search: debouncedSearchValue.trim() }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data.products.items,
  });
  const setFilterStoring = useStore(useShallow((state) => state.setFilterStoring));
  const setHistorySearchItem = useHistorySearchProductStore(useShallow((state) => state.setItem));

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchResultItemPress = useCallback((product: Pick<Product, 'id' | 'name'>) => {
    setHistorySearchItem(product);
    setFilterStoring({ search: product.name });
    navigation.push('BottomTabStack', {
      screen: 'StoresStack',
      params: {
        screen: 'StoresScreen',
      },
    });
  }, []);

  const handleSearchIconPress = useCallback(() => {
    setHistorySearchItem({ id: new Date().getTime().toString(), name: debouncedSearchValue });
    setFilterStoring({ search: debouncedSearchValue });
    navigation.push('BottomTabStack', {
      screen: 'StoresStack',
      params: {
        screen: 'StoresScreen',
      },
    });
  }, [debouncedSearchValue]);

  return (
    <ScrollView
      contentContainerClassName='mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <RNPressable className='flex-1 pb-[14px]' onPress={Keyboard.dismiss}>
        <View className='flex-1 px-[25px]'>
          <SearchName
            value={searchValue}
            onChangeText={handleSearchValueChange}
            onSearchPress={handleSearchIconPress}
          />

          <View className='mt-[25px] pb-[50px]'>
            {isSearchProductNameListFetching ? (
              <LoadingOverlay />
            ) : debouncedSearchValue ? (
              searchProductNameList?.length ? (
                <SearchSuggestions data={searchProductNameList} onItemPress={handleSearchResultItemPress} />
              ) : (
                <NoResultsMessage />
              )
            ) : (
              <RecentlySearched onItemPress={handleSearchResultItemPress} />
            )}
          </View>
        </View>

        <View className={`rounded-t-[10px] ${isDarkColorScheme ? 'bg-secondary' : 'bg-destructive-foreground'}`}>
          <ProductList title='Featured Product' data={featuredProduct || []} />
        </View>
      </RNPressable>
    </ScrollView>
  );
};

export default SearchProductScreen;
