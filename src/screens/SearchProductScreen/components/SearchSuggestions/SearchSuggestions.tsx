import { memo } from 'react';
import { View } from 'react-native';

import Pressable from '~components/customs/Pressable';
import { Search } from '~components/icons';
import { Text } from '~components/ui/text';
import { Product, SearchProductByNameQuery } from '~graphql/graphql';

interface SearchSuggestionsProps {
  data: SearchProductByNameQuery['products']['items'];
  onItemPress: (item: Pick<Product, 'id' | 'name'>) => void;
}

const SearchSuggestions = ({ data, onItemPress }: SearchSuggestionsProps) => {
  return (
    <View className='gap-[20px]'>
      <Text className='font-inter-medium text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
        Search Suggestions
      </Text>
      <View className='gap-[25px]'>
        {data.map((product) => (
          <Pressable key={product.id} onPress={() => onItemPress(product)}>
            <View className='flex-row items-center gap-[10px]'>
              <Search className='text-border' size={20} />
              <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
                {product.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default memo(SearchSuggestions);
