import { useState } from 'react';
import { Keyboard, Pressable as RNPressable, ScrollView, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import Pressable from '~components/customs/Pressable';
import ProductList from '~components/customs/ProductList';
import SearchName from '~components/customs/SearchName';
import { Inbox, Search } from '~components/icons';
import { Text } from '~components/ui/text';
import { GET_FEATURED_PRODUCT_QUERY_KEY, SEARCH_PRODUCT_BY_NAME_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
import { useColorScheme, useDebounce } from '~hooks';
import { GetFeaturedProductQuery, SearchProductByNameQuery } from '~services/product.services';
import { useHistorySearchProductStore } from '~store';

const SearchProductScreen = () => {
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
    queryFn: () => execute(SearchProductByNameQuery, { search: debouncedSearchValue }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data.products.items,
  });
  const historySearchProductStore = useHistorySearchProductStore(
    useShallow((state) => ({
      list: state.list,
      setItem: state.setItem,
    })),
  );

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchResultItemPress = (name: string) => {
    historySearchProductStore.setItem(name);
  };

  return (
    <ScrollView
      contentContainerClassName='mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <RNPressable className='flex-1 pb-[14px]' onPress={Keyboard.dismiss}>
        <View className='flex-1 px-[25px]'>
          <SearchName value={searchValue} onChangeText={handleSearchValueChange} />

          <View className='items-center mt-[30px] pb-[50px]'>
            {isSearchProductNameListFetching && <LoadingOverlay />}

            {debouncedSearchValue && !!searchProductNameList?.length && (
              <View className='gap-[20px]'>
                <Text className='font-inter-medium text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
                  Search Suggestions
                </Text>
                <ScrollView contentContainerClassName='gap-[25px]'>
                  {searchProductNameList.map((product) => (
                    <Pressable key={product.id} onPress={() => handleSearchResultItemPress(product.name)}>
                      <View className='flex-row items-center gap-[10px]'>
                        <Search className='text-border' />
                        <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
                          {product.name}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {debouncedSearchValue && isSearchProductNameListFetching && !searchProductNameList?.length && (
              <View className='mt-[20px] gap-[20px] items-center'>
                <Inbox size={64} className='text-muted-foreground' strokeWidth={0.4} />
                <Text className='font-inter-medium mt-[10px] text-center text-foreground text-[16px] leading-[20px] tracking-[0.2px] capitalize'>
                  There are no suitable products
                </Text>
                <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
                  Please try using other keywords to find the product name
                </Text>
              </View>
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
