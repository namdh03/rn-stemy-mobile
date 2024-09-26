import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '~components/ui/text';
import { GetProductQuery } from '~graphql/graphql';

interface CategoryListProps {
  categories: GetProductQuery['product']['categories'];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <View className='mt-[20px]'>
      <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px] mb-[10px]'>
        Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 25 }}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className='mr-[15px] py-[10px] px-[15px] bg-muted rounded-[10px]'
            onPress={() => {
              console.log(`Selected Category: ${category}`);
            }}
          >
            <Text className='font-inter-medium text-foreground text-[14px]'>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
