import { ScrollView, View } from 'react-native';

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
    <View>
      <View className='flex-row items-center'>
        <View className='flex-1 px-[7px] py-[10px] bg-[#16A34A1A] border border-accent'>
          <Text className='font-inter-semiBold text-foreground text-[14px]'>Categories</Text>
        </View>
        <View className='flex-1 px-[7px] py-[10px] bg-[#16A34A1A] border border-accent'>
          <Text className='font-inter-semiBold text-foreground text-[14px]'>Description</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(groupedCategories).map(([title, categoryGroup], index) => (
          <View key={index} className='flex-row items-center'>
            <View className='flex-1 px-[7px] py-[10px] border border-accent'>
              <Text className='font-inter-regular text-foreground text-[12px]'>{title}</Text>
            </View>
            <View className='flex-1 px-[7px] py-[10px] border border-accent'>
              <Text className='font-inter-regular text-foreground text-[12px]'>
                {categoryGroup.map((category) => category.name).join(', ')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
