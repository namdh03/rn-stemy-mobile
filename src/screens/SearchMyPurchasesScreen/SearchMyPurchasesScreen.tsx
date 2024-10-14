import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, Pressable as RNPressable, RefreshControl, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useQuery } from '@tanstack/react-query';

import images from '~assets/images';
import LabList from '~components/customs/LabList';
import LoadingOverlay from '~components/customs/LoadingOverlay';
import SearchName from '~components/customs/SearchName';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useDebounce, useRefreshByUser } from '~hooks';
import { cn } from '~lib/utils';
import { GetMyPurchasesQuery } from '~services/lab.services';

const SearchMyPurchasesScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const inputRef = useRef<TextInput>(null);

  const {
    data: labList,
    refetch: refetchLabList,
    isFetching: isFetchingLabList,
  } = useQuery({
    queryKey: [constants.PURCHASES_QUERY_KEY.GET_USER_LABS_IN_ORDER_QUERY_KEY, debouncedSearchValue],
    queryFn: () => execute(GetMyPurchasesQuery, { search: debouncedSearchValue.trim() }),
    enabled: !!debouncedSearchValue,
    select: (data) => data.data.searchOrder,
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetchLabList);

  const labListSorted = useMemo(() => {
    return [...(labList || [])].sort((a, b) => {
      const dateA = new Date(b.createdAt).getTime();
      const dateB = new Date(a.createdAt).getTime();
      return dateA - dateB;
    });
  }, [labList]);

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
        'bg-muted': debouncedSearchValue && labList?.length !== 0,
      })}
    >
      {/* RNPressable around the search section */}
      <RNPressable className='gap-[8px] px-[25px] mb-[18px]' onPress={Keyboard.dismiss}>
        <SearchName
          ref={inputRef}
          value={searchValue}
          active={!!debouncedSearchValue && labList?.length !== 0}
          placeholder='Search Lab Name or Purchase ID'
          onChangeText={handleSearchValueChange}
        />
        {debouncedSearchValue && (
          <Text className='font-inter-medium text-foreground text-[12px]'>
            Showing results for keyword “{debouncedSearchValue}”
          </Text>
        )}
      </RNPressable>

      {/* Content area */}
      {isFetchingLabList ? (
        <LoadingOverlay />
      ) : debouncedSearchValue ? (
        labList?.length ? (
          <FlatList
            data={labListSorted}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className='w-full'>
                <LabList data={item} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
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
            refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
          >
            <RNPressable className='flex-1 gap-[8px] items-center pt-[100px] px-[25px]' onPress={Keyboard.dismiss}>
              <Image source={images.searchOrders} style={{ width: 135, height: 128 }} resizeMode='cover' />
              <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
                No results found. Try searching with different keywords.
              </Text>
            </RNPressable>
          </ScrollView>
        )
      ) : (
        <RNPressable className='flex-1 gap-[8px] items-center pt-[100px] px-[25px]' onPress={Keyboard.dismiss}>
          <Image source={images.searchOrders} style={{ width: 135, height: 128 }} resizeMode='cover' />
          <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
            Search by Lab Name or Purchase ID to find your purchases.
          </Text>
        </RNPressable>
      )}
    </View>
  );
};

export default SearchMyPurchasesScreen;
