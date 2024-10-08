import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, Pressable as RNPressable, RefreshControl, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useQuery } from '@tanstack/react-query';

import images from '~assets/images';
import LoadingOverlay from '~components/customs/LoadingOverlay';
import OrderItem from '~components/customs/OrderItem';
import SearchName from '~components/customs/SearchName';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useDebounce, useRefreshByUser } from '~hooks';
import { cn } from '~lib/utils';
import { SearchOrderQuery } from '~services/order.services';

const SearchOrdersScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const inputRef = useRef<TextInput>(null);
  const {
    data: searchOrderList,
    refetch: searchOrderListRefetch,
    isFetching: isSearchOrderListFetching,
  } = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.SEARCH_ORDER_QUERY_KEY, debouncedSearchValue],
    queryFn: () => execute(SearchOrderQuery, { search: debouncedSearchValue.trim() }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data.searchOrder,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(searchOrderListRefetch);
  const searchOrderListSorted = useMemo(() => {
    return [...(searchOrderList || [])].sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime();
      const dateB = new Date(a.updatedAt || a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [searchOrderList]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearchValueChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <View
      className={cn('flex-grow mx-auto w-full max-w-xl', {
        'bg-muted': debouncedSearchValue && searchOrderList?.length !== 0,
      })}
    >
      {/* RNPressable only around the header section */}
      <RNPressable className='gap-[8px] px-[25px] mb-[18px]' onPress={Keyboard.dismiss}>
        <SearchName
          ref={inputRef}
          value={searchValue}
          active={!!debouncedSearchValue && searchOrderList?.length !== 0}
          placeholder='Search Product Name or Order ID'
          onChangeText={handleSearchValueChange}
          // onSearchPress={handleSearchIconPress}
        />
        {debouncedSearchValue && (
          <Text className='font-inter-medium text-foreground text-[12px]'>
            Showing order for key word “{debouncedSearchValue}”
          </Text>
        )}
      </RNPressable>

      {/* Main content area */}
      {isSearchOrderListFetching ? (
        <LoadingOverlay />
      ) : debouncedSearchValue ? (
        searchOrderList?.length ? (
          <FlatList
            data={searchOrderListSorted}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem order={item} />}
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            refreshControl={
              <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
            }
            className='flex-1'
            contentContainerClassName='gap-[16px] pb-[50px]'
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={50}
            windowSize={21}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingByUser}
                onRefresh={refetchByUser}
                tintColor='#your-primary-color'
              />
            }
          >
            <RNPressable className='flex-1 gap-[8px] items-center pt-[100px] px-[25px]' onPress={Keyboard.dismiss}>
              <Image source={images.searchOrders} style={{ width: 135, height: 128 }} resizeMode='cover' />
              <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
                Please try using other keywords to find the product name or order id
              </Text>
            </RNPressable>
          </ScrollView>
        )
      ) : (
        <RNPressable className='flex-1 gap-[8px] items-center pt-[100px] px-[25px]' onPress={Keyboard.dismiss}>
          <Image source={images.searchOrders} style={{ width: 135, height: 128 }} resizeMode='cover' />
          <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
            You can search by Order ID or Product name
          </Text>
        </RNPressable>
      )}
    </View>
  );
};

export default SearchOrdersScreen;
