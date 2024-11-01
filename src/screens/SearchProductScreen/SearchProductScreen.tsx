import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, TextInput, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import SearchName from '~components/customs/SearchName';
import constants from '~constants';
import execute from '~graphql/execute';
import { Product } from '~graphql/graphql';
import { useDebounce } from '~hooks';
import { SearchProductByNameQuery } from '~services/product.services';
import { useHistorySearchProductStore, useStore } from '~store';
import { SearchProductScreenNavigationProps } from '~types/navigation.type';

import NoResultsMessage from './components/NoResultsMessage';
import RecentlySearched from './components/RecentlySearched';
import SearchSuggestions from './components/SearchSuggestions';

const SearchProductScreen = ({ navigation }: SearchProductScreenNavigationProps) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const inputRef = useRef<TextInput>(null);
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
      contentContainerClassName='mx-auto w-full max-w-xl pb-[14px]'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
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
    </ScrollView>
  );
};

export default SearchProductScreen;
