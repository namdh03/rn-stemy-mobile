import { useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';

import { Star } from '~components/icons';
import { Input } from '~components/ui/input';
import { Text } from '~components/ui/text';

import Divider from '../Divider';
import Pressable from '../Pressable';

interface FeedbackProps {
  image: ImageSourcePropType | string;
  name: string;
  hasLab: boolean;
  onFeedbackChange: (rating: number, note: string) => void;
}

const FeedbackProduct = ({ image, name, hasLab, onFeedbackChange }: FeedbackProps) => {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');

  const handleRating = (value: number) => {
    setRating(value);
    onFeedbackChange(value, note); // Cập nhật ngay khi chọn rating
  };

  const handleNoteChange = (text: string) => {
    setNote(text);
    onFeedbackChange(rating, text); // Cập nhật ngay khi nhập comment
  };

  return (
    <View className='w-full h-[345px] flex-col items-center p-[15px] gap-[19px] mt-[10px] bg-[#FFF]'>
      {/* View info product */}
      <View className='w-full h-[45px] '>
        <View className='flex-row items-center mb-[8px] justify-start gap-[5px]'>
          <View className='p-[5px]'>
            <Image
              source={typeof image === 'string' ? { uri: image } : image}
              style={{ width: 35, height: 35 }}
              className='rounded-[16px]'
            />
          </View>
          <View>
            <Text className='font-inter-regular text-[14px] text-[#000]'>{name}</Text>
            <Text className='font-inter-regular text-[12px] text-muted-foreground'>
              {hasLab ? 'Lab included' : 'No Lab'}
            </Text>
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
          onChangeText={handleNoteChange}
          style={{ height: '100%' }}
          className='flex-1 bg-[#F4F4F5] px-[14px] py-[12px] gap-[8px] placeholder:text-[##71717A] placeholder:leading-[24px]'
        />
      </View>
    </View>
  );
};

export default FeedbackProduct;
