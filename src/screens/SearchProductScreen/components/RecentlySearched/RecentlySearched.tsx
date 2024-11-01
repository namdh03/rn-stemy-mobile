import { memo } from 'react';
import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import Pressable from '~components/customs/Pressable';
import { Clock, X } from '~components/icons';
import { Text } from '~components/ui/text';
import { Product } from '~graphql/graphql';
import { useHistorySearchProductStore } from '~store';

interface RecentlySearchedProps {
  onItemPress: (item: Pick<Product, 'id' | 'name'>) => void;
}

const RecentlySearched = ({ onItemPress }: RecentlySearchedProps) => {
  const historySearchProductStore = useHistorySearchProductStore(
    useShallow((state) => ({
      list: state.list,
      removeItem: state.removeItem,
    })),
  );

  return (
    historySearchProductStore.list.length !== 0 && (
      <View className='gap-[20px]'>
        <Text className='font-inter-medium text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
          Recently Searched
        </Text>
        <View className='gap-[25px]'>
          {historySearchProductStore.list.map((item) => (
            <View key={item.id} className='flex-row items-center'>
              <Pressable key={item.id} className='flex-1' onPress={() => onItemPress(item)}>
                <View className='flex-row items-center gap-[10px]'>
                  <Clock className='text-border' size={20} />
                  <Text
                    numberOfLines={1}
                    className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'
                  >
                    {item.name}
                  </Text>
                </View>
              </Pressable>
              <Pressable className='pl-[8px]' onPress={() => historySearchProductStore.removeItem(item.id)}>
                <X className='text-foreground' size={20} />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    )
  );
};

export default memo(RecentlySearched);
