import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable as RNPressable, ScrollView, TextInput, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import ProductList from '~components/customs/ProductList';
import SearchName from '~components/customs/SearchName';
import constants from '~constants';
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);
  const inputRef = useRef<TextInput>(null);
  const { data: featuredProduct } = useQuery({
    queryKey: [constants.PRODUCT_QUERY_KEY.GET_FEATURED_PRODUCT_QUERY_KEY],
    queryFn: () => execute(GetFeaturedProductQuery),
    select: (data) => data.data.products.items,
  });
  const { data: searchProductNameList, isFetching: isSearchProductNameListFetching } = useQuery({
    queryKey: [constants.PRODUCT_QUERY_KEY.SEARCH_PRODUCT_BY_NAME_QUERY_KEY, debouncedSearchValue],
    queryFn: () => execute(SearchProductByNameQuery, { search: debouncedSearchValue.trim() }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data.products.items,
  });
  const setFilterStoring = useStore(useShallow((state) => state.setFilterSorting));
  const setHistorySearchItem = useHistorySearchProductStore(useShallow((state) => state.setItem));

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchResultItemPress = useCallback((product: Pick<Product, 'id' | 'name'>) => {
    setHistorySearchItem(product);
    setFilterStoring({ search: product.name });
    navigation.push('RootDrawer', {
      screen: 'RootBottomTabs',
      params: {
        screen: 'StoresScreen',
      },
    });
  }, []);

  const handleSearchIconPress = useCallback(() => {
    if (debouncedSearchValue) setHistorySearchItem({ id: new Date().getTime().toString(), name: debouncedSearchValue });
    setFilterStoring({ search: debouncedSearchValue });
    navigation.push('RootDrawer', {
      screen: 'RootBottomTabs',
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
            ref={inputRef}
            value={searchValue}
            placeholder='Search Product Name'
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

        {!isKeyboardVisible && (
          <View className={`rounded-t-[10px] ${isDarkColorScheme ? 'bg-secondary' : 'bg-destructive-foreground'}`}>
            <ProductList
              title='Featured Product'
              data={featuredProduct || []}
              onPress={() =>
                navigation.push('RootDrawer', {
                  screen: 'RootBottomTabs',
                  params: {
                    screen: 'StoresScreen',
                  },
                })
              }
            />
          </View>
        )}
      </RNPressable>
    </ScrollView>
  );
};

export default SearchProductScreen;
