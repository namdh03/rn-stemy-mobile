import { View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import Pressable from '~components/customs/Pressable';
import { CircleCheck } from '~components/icons';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { SortOrder } from '~graphql/graphql';
import { CategoriesFormType } from '~navigation/BottomTabNavigator/stack/StoresStack/data/schema';
import sortData from '~navigation/BottomTabNavigator/stack/StoresStack/data/sort-data';

interface TabSortingContentProps {
  form: UseFormReturn<CategoriesFormType>;
}

const TabSortingContent = ({ form }: TabSortingContentProps) => {
  const { order, sort } = form.watch();

  const handlePress = (newOrder: SortOrder, newSort: 'name' | 'price' | 'id') => {
    form.setValue('order', newOrder);
    form.setValue('sort', newSort);
  };

  return (
    <View className='gap-[16px] pb-[110px] mt-[10px] px-[33px]'>
      {sortData.map(({ label, order: sortOrder, sort: sortField }, index) => (
        <Pressable key={index} onPress={() => handlePress(sortOrder, sortField)}>
          <View className='flex-row justify-between items-center w-full pb-[20px]'>
            <Text className='font-inter-medium text-[14px] text-foreground leading-[22px]'>{label}</Text>
            {order === sortOrder && sort === sortField && (
              <CircleCheck className='ml-auto text-background fill-primary' size={22} />
            )}
          </View>
          {index < sortData.length - 1 && <Separator className='bg-muted' />}
        </Pressable>
      ))}
    </View>
  );
};

export default TabSortingContent;
