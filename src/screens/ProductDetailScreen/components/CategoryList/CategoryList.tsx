import { ScrollView, View } from 'react-native';

import { Button } from '~components/ui/button';
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <Button
            key={index}
            variant='outline'
            size='sm'
            onPress={() => {
              console.log(`Selected Category: ${category}`);
            }}
            style={{ marginRight: 8 }}
          >
            <Text className='font-inter-medium text-foreground text-[14px]'>{category.name}</Text>
          </Button>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
