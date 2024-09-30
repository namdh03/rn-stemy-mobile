import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import { Text } from '~components/ui/text';
import { GetProductQuery } from '~graphql/graphql';

import Pressable from '../Pressable';
import ProductCard from '../ProductCard';

interface ProductListProps {
  title: string;
  data: GetProductQuery['products']['items'];
  onPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.55;

export default function ProductList({ title, data, onPress }: ProductListProps) {
  const renderItem = ({ item }: { item: GetProductQuery['products']['items'][number] }) => {
    return (
      <View style={{ width: ITEM_WIDTH, marginRight: 15 }}>
        <ProductCard
          id={item.id}
          imageUrl={item.images[0]?.url}
          numOfReviews={item.feedbacks.length || 0}
          price={item.price}
          rating={item.rating}
          title={item.name}
        />
      </View>
    );
  };

  return (
    <View className={'px-[25px] py-[20px] rounded-t-[10px] '}>
      <View className='flex-row items-center justify-between mb-[24px]'>
        <Text className='font-inter-medium text-foreground text-[17px] leading-[25px] tracking-[0.061px]'>{title}</Text>
        <Pressable onPress={onPress}>
          <Text className='font-inter-medium text-primary text-[16px] leading-[22px] tracking-[0.048px]'>See All</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate='fast'
        contentContainerStyle={{ paddingRight: 24 }}
      />
    </View>
  );
}
