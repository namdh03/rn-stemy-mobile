import { ScrollView, View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { GetProductQuery } from '~graphql/graphql';

interface CategoryListProps {
  categories: GetProductQuery['product']['categories'];
}

// Group categories by title
const groupCategoriesByTitle = (categories: CategoryListProps['categories']) => {
  return categories.reduce(
    (acc, category) => {
      if (!acc[category.title]) {
        acc[category.title] = [];
      }
      acc[category.title].push(category);
      return acc;
    },
    {} as { [key: string]: GetProductQuery['product']['categories'] },
  );
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const groupedCategories = groupCategoriesByTitle(categories);

  return (
    <View className='mt-[20px]'>
      <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px] mb-[10px]'>
        Categories
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='gap-y-[16px]'>
        {Object.entries(groupedCategories).map(([title, categoryGroup], index) => (
          <View key={index} className='gap-[8px]'>
            <Text className='font-inter-medium text-foreground text-[14px]'>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoryGroup.map((category, index) => (
                <Button
                  key={index}
                  variant='outline'
                  size='sm'
                  onPress={() => {
                    console.log(`Selected Category: ${category.name}`);
                  }}
                  style={{ marginRight: 8 }}
                >
                  <Text className='font-inter-medium text-foreground text-[14px]'>{category.name}</Text>
                </Button>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
