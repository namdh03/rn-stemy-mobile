import { memo, useCallback, useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LayoutChangeEvent } from 'react-native';
import { UseFormReturn, useWatch } from 'react-hook-form';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useQuery } from '@tanstack/react-query';

import Pressable from '~components/customs/Pressable';
import { FormCheckbox, FormField, FormItem } from '~components/deprecated-ui/form';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { GetProductCategoriesQuery as GetProductCategoriesQueryType } from '~graphql/graphql';
import { cn } from '~lib/utils';
import { CategoriesFormType } from '~navigation/RootDrawer/data/schema';
import { GetProductCategoriesQuery } from '~services/category.services';
import capitalizeFirstLetter from '~utils/capitalizeFirstLetter';

import MarkerSlider from '../MarkerSlider';

interface TabFilterContentProps {
  form: UseFormReturn<CategoriesFormType>;
}

const TabFilterContent = ({ form }: TabFilterContentProps) => {
  const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width - 40);
  const { data } = useQuery({
    queryKey: [constants.CATEGORY_QUERY_KEY.GET_PRODUCT_CATEGORIES_QUERY_KEY],
    queryFn: () => execute(GetProductCategoriesQuery),
    select: (data) => data.data.productCategories,
  });

  const categorizedByType = useMemo(() => {
    if (!data) return [];
    return data.reduce(
      (acc, category) => {
        const { type } = category;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(category);
        return acc;
      },
      {} as Record<string, GetProductCategoriesQueryType['productCategories']>,
    );
  }, [data]);

  const priceRange = useWatch({ control: form.control, name: 'priceRange' });
  const rating = useWatch({ control: form.control, name: 'rating' });

  const handlePriceChangeEnd = useCallback(
    (values: number[]) => {
      form.setValue('priceRange', values, { shouldValidate: true });
    },
    [form],
  );

  const onSliderLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const handleRatingPress = (ratingValue: number) => {
    if (ratingValue === rating) return form.setValue('rating', 0, { shouldValidate: true });
    form.setValue('rating', ratingValue, { shouldValidate: true });
  };

  return (
    <View className='gap-[16px] pb-[50px]'>
      {/* Price Slider */}
      <View className='px-[33px]'>
        <Text className='font-inter-regular text-foreground text-[14px] leading-[20px]'>Price</Text>
        <View onLayout={onSliderLayout} className='px-[10px]'>
          <MultiSlider
            values={priceRange}
            onValuesChangeFinish={handlePriceChangeEnd}
            sliderLength={sliderWidth}
            min={constants.FILTER_SORTING.DEFAULT_MIN_PRICE}
            max={constants.FILTER_SORTING.DEFAULT_MAX_PRICE}
            step={constants.FILTER_SORTING.SLIDER_STEP_VALUE}
            allowOverlap={false}
            snapped={true}
            selectedStyle={{ backgroundColor: '#16a34a' }}
            unselectedStyle={{ backgroundColor: '#f4f4f5' }}
            customMarker={() => <MarkerSlider />}
          />
        </View>
        <View className='flex-row justify-between'>
          <Text className='font-inter-bold text-foreground text-[14px]'>{priceRange[0].toLocaleString()} ₫</Text>
          <Text className='font-inter-bold text-foreground text-[14px]'>{priceRange[1].toLocaleString()} ₫</Text>
        </View>
      </View>

      <Separator className='bg-transparent border-dashed border-t border-primary' />

      {/* Rating Filter */}
      <View className='gap-[16px] px-[33px]'>
        <Text className='font-inter-bold text-foreground text-[14px] leading-[20px]'>Rating</Text>
        <View className='flex-row flex-wrap gap-[16px]'>
          {[5, 4, 3, 2, 1].map((star) => (
            <Pressable
              key={star}
              onPress={() => handleRatingPress(star)}
              className={cn('items-center justify-center w-[46%] py-[9px] rounded-[6px] border', {
                'border-primary bg-background': rating === star,
                'border-transparent bg-muted': rating !== star,
              })}
            >
              <Text className='font-inter-regular text-foreground text-[12px]'>
                {star !== 1 ? `${star} Stars & Up` : `${star} Star & Up`}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Separator className='bg-transparent border-dashed border-t border-primary' />

      {/* Categories Filter */}
      <View className='px-[33px]'>
        <FormField
          control={form.control}
          name='categoryIds'
          render={() => (
            <FormItem className='gap-[18px]'>
              {Object.entries(categorizedByType).map(([type, categories]) => (
                <View key={type}>
                  <Text className='font-inter-bold text-foreground text-[14px] leading-[20px]'>
                    {capitalizeFirstLetter(type)}
                  </Text>

                  <View>
                    {categories.map((category) => (
                      <View key={category.id}>
                        <Separator className='mt-[14px] mb-[17px] bg-muted' />
                        <View className='flex-row items-center justify-between'>
                          <Text className='font-inter-medium text-foreground text-[14px]'>{category.name}</Text>
                          <FormField
                            control={form.control}
                            name='categoryIds'
                            render={({ field }) => {
                              return (
                                <FormCheckbox
                                  {...field}
                                  iconSize={12}
                                  value={field.value?.includes(+category.id)}
                                  onChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, +category.id])
                                      : field.onChange(field.value?.filter((value) => value !== +category.id));
                                  }}
                                  className='w-[20px] h-[20px]'
                                />
                              );
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </FormItem>
          )}
        />
      </View>
    </View>
  );
};

export default memo(TabFilterContent);
