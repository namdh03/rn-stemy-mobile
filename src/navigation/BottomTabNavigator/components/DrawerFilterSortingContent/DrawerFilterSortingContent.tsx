import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { zodResolver } from '@hookform/resolvers/zod';

import Pressable from '~components/customs/Pressable';
import { Form } from '~components/deprecated-ui/form';
import { X } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~components/ui/tabs';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { cn } from '~lib/utils';
import schema, { CategoriesFormType } from '~navigation/BottomTabNavigator/stack/StoresStack/data/schema';
import { useStore } from '~store';

import TabFilterContent from '../TabFilterContent';

interface DrawerFilterSortingContent {
  onClose: () => void;
}

const DrawerFilterSortingContent = ({ onClose }: DrawerFilterSortingContent) => {
  const { storesFilterSorting, setFilterStoring, clearFilterStoring } = useStore(
    useShallow((state) => ({
      storesFilterSorting: state.storesFilterSorting,
      setFilterStoring: state.setFilterStoring,
      clearFilterStoring: state.clearFilterStoring,
    })),
  );
  const form = useForm<CategoriesFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryIds: Array.isArray(storesFilterSorting.categoryIds)
        ? [...storesFilterSorting.categoryIds]
        : [storesFilterSorting.categoryIds],
      priceRange: [
        storesFilterSorting.minPrice || constants.FILTER_SORTING.SLIDER_DISPLAY_MIN_PRICE,
        storesFilterSorting.maxPrice || constants.FILTER_SORTING.SLIDER_DISPLAY_MAX_PRICE,
      ],
      rating: storesFilterSorting.minRating || constants.FILTER_SORTING.MIN_RATING_VALUE,
    },
  });
  const [value, setValue] = useState('filter');

  const onSubmit = (values: CategoriesFormType) => {
    setFilterStoring({
      categoryIds: values.categoryIds,
      minPrice: values.priceRange[0],
      maxPrice: values.priceRange[1],
      minRating: values.rating,
    });
    onClose();
  };

  const onReset = () => {
    form.reset();
    clearFilterStoring();
  };

  return (
    <View className='flex-grow'>
      <View className='flex-row justify-between items-center px-[33px] py-[15px] shadow'>
        <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
          Filter & Sorting
        </Text>
        <Pressable onPress={onClose}>
          <X className='text-foreground' />
        </Pressable>
      </View>

      <View className='flex-grow px-[33px] pb-[100px]'>
        <ScrollView className='flex-grow' showsVerticalScrollIndicator={false} automaticallyAdjustContentInsets={false}>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className='flex-row justify-start gap-[20px] p-0 native:p-0 bg-transparent'>
              <View>
                <TabsTrigger value='filter' className='px-0 native:px-0'>
                  <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
                    Filter
                  </Text>
                </TabsTrigger>
                <View
                  className={cn('border-t-2', {
                    'border-primary': value === 'filter',
                    'border-transparent': value !== 'filter',
                  })}
                />
              </View>
              <View>
                <TabsTrigger value='sorting' className='px-0 native:px-0'>
                  <Text className='font-inter-regular text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
                    Sorting
                  </Text>
                </TabsTrigger>
                <View
                  className={cn('border-t-2', {
                    'border-primary': value === 'sorting',
                    'border-transparent': value !== 'sorting',
                  })}
                />
              </View>
            </TabsList>

            <Separator className='my-[20px] bg-transparent border-dashed border-t border-primary' />

            <TabsContent value='filter'>
              <Form {...form}>
                <TabFilterContent form={form} />
              </Form>
            </TabsContent>
            <TabsContent value='sorting'>
              <Text>SORTING</Text>
            </TabsContent>
          </Tabs>
        </ScrollView>
      </View>

      <View className='absolute bottom-0 left-0 right-0 z-10 flex-row gap-[15px] pt-[15px] pb-[70px] px-[12px] bg-background shadow'>
        <Button variant='outline' className='flex-1' onPress={onReset}>
          <Text>Reset</Text>
        </Button>
        <Button className='flex-1' onPress={form.handleSubmit(onSubmit)}>
          <Text>Apply</Text>
        </Button>
      </View>
    </View>
  );
};

export default DrawerFilterSortingContent;
