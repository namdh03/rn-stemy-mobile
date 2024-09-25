import React from 'react';
import { View } from 'react-native';

import { Star } from '~components/icons';

type RatingProps = {
  rating: number;
  nonFillColor?: string;
};

export default function StarRating({ rating, nonFillColor = 'text-muted-foreground' }: RatingProps) {
  return (
    <View className='flex-row gap-[2px]'>
      {[...Array(5)].map((_, index) => (
        <Star key={index} size={16} className={index < rating ? 'text-[#FFC120] fill-[#FFC120]' : nonFillColor} />
      ))}
    </View>
  );
}
