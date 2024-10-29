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
import { SortOrder } from '~graphql/graphql';
import { cn } from '~lib/utils';
import schema, { CategoriesFormType } from '~navigation/BottomTabNavigator/stack/StoresStack/data/schema';
import { useStore } from '~store';

import TabFilterContent from '../TabFilterContent';
import TabSortingContent from '../TabSortingContent';

const DrawerFilterSortingContent = () => {
  const { storesFilterSorting, setFilterSorting, clearFilterSorting, onStoresDrawerClose } = useStore(
    useShallow((state) => ({
      storesFilterSorting: state.storesFilterSorting,
      setFilterSorting: state.setFilterSorting,
      clearFilterSorting: state.clearFilterSorting,
      onStoresDrawerClose: state.onStoresDrawerClose,
    })),
  );
  const form = useForm<CategoriesFormType>({
    resolver: zodResolver(schema),
    values: {
      categoryIds: Array.isArray(storesFilterSorting.categoryIds)
        ? [...storesFilterSorting.categoryIds]
        : [storesFilterSorting.categoryIds],
      priceRange: [
        storesFilterSorting.minPrice || constants.FILTER_SORTING.SLIDER_DISPLAY_MIN_PRICE,
        storesFilterSorting.maxPrice || constants.FILTER_SORTING.SLIDER_DISPLAY_MAX_PRICE,
      ],
      rating: storesFilterSorting.minRating || constants.FILTER_SORTING.MIN_RATING_VALUE,
      order: storesFilterSorting.order || SortOrder.Asc,
      sort: (storesFilterSorting.sort as 'name' | 'price' | 'id') || constants.FILTER_SORTING.DEFAULT_SORT_BY_FIELD,
    },
  });
  const [value, setValue] = useState('filter');

  const onSubmit = (values: CategoriesFormType) => {
    setFilterSorting({
      categoryIds: values.categoryIds,
      minPrice: values.priceRange[0],
      maxPrice: values.priceRange[1],
      minRating: values.rating,
      order: values.order,
      sort: values.sort,
    });
    onStoresDrawerClose();
  };

  const onReset = () => {
    form.reset();
    onStoresDrawerClose();
    clearFilterSorting();
  };

  return (
    <View className='flex-1 flex-grow pb-[50px]'>
      <View className='flex-row justify-between items-center px-[33px] py-[15px] shadow'>
        <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
          Filter & Sorting
        </Text>
        <Pressable onPress={onStoresDrawerClose}>
          <X className='text-foreground' />
        </Pressable>
      </View>

      <ScrollView className='flex-grow' showsVerticalScrollIndicator={false} automaticallyAdjustContentInsets={false}>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList className='flex-row justify-start gap-[20px] px-[33px] native:p-0 bg-transparent'>
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

          <Form {...form}>
            <TabsContent value='filter'>
              <TabFilterContent form={form} />
            </TabsContent>
            <TabsContent value='sorting'>
              <TabSortingContent form={form} />
            </TabsContent>
          </Form>
        </Tabs>
      </ScrollView>

      <View
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10 }}
        className='flex-row gap-[15px] px-[12px] shadow py-[20px] bg-background'
      >
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
