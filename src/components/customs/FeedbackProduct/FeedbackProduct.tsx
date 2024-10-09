import { useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

import images from '~assets/images';
import { Star } from '~components/icons';
import { Input } from '~components/ui/input';
import { Text } from '~components/ui/text';

import Divider from '../Divider';
import Pressable from '../Pressable';

const FeedbackProduct = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };
  return (
    <View className='w-[375px] h-[345px] flex-col items-center p-[15px] gap-[19px] mt-[10px]'>
      {/* View info product */}
      <View className='w-full h-[45px] '>
        <View className='flex-row items-center mb-[8px] justify-start gap-[5px]'>
          <View className='p-[5px]'>
            <Image source={images.product} style={{ width: 35, height: 35 }} className='rounded-[16px]' />
          </View>
          <View>
            <Text className='font-inter-regular text-[14px] text-[#000]'>Sữa Chống Nắng Sunplay</Text>
            <Text className='font-inter-regular text-[12px] text-muted-foreground'>Variation: 70g</Text>
          </View>
        </View>
        <Divider />
      </View>
      {/* Rating */}
      <View className='flex-row items-center justify-center w-[271px] h-[20px] gap-[19px]'>
        <Text className='font-inter-medium text-[14px] text-[#000]'>Product Quality</Text>
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable key={value} onPress={() => handleRating(value)}>
            <View className='flex-row items-center gap-[12px]'>
              <Star size={16} className={value <= rating ? 'color-[#F1C43C]' : 'color-[#D4D6DD]'} />
            </View>
          </Pressable>
        ))}
      </View>
      {/* Comment */}
      <View className='w-[328px] h-[212px]'>
        <Input
          placeholder='Share more thoughts on the product to help other buyers.'
          multiline={true}
          textAlignVertical='top'
          style={{ height: '100%' }}
          className='flex-1 bg-[#F4F4F5] px-[14px] py-[12px] gap-[8px] placeholder:text-[##71717A] placeholder:leading-[24px]'
        />
      </View>
    </View>
  );
};

export default FeedbackProduct;
