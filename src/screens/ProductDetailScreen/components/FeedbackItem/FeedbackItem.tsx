import { Text, View } from 'react-native';
import dayjs from 'dayjs';

import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/avatar';

import StarRating from '../StarRating';

interface FeedbackItemProps {
  id: string;
  avatar: string;
  name: string;
  time: string;
  rating: number;
  note: string;
  nonFillColor?: string;
}

const FeedbackItem = ({ id, avatar, name, time, rating, note, nonFillColor }: FeedbackItemProps) => {
  return (
    <View key={id} className='flex-row gap-[15px]'>
      <Avatar alt={name} className='w-[40px] h-[40px]'>
        <AvatarImage source={{ uri: avatar }} />
        <AvatarFallback>
          <Text>{name.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>

      <View className='flex-1 gap-[10px]'>
        <View className='gap-[5px]'>
          <View className='flex-row items-center'>
            <Text className='font-inter-medium w-[140px] text-foreground text-[14px] leading-[20px] tracking-[0.2px]'>
              {name}
            </Text>

            <View className='ml-auto'>
              <Text className='font-inter-regular text-muted-foreground text-[12px] tracking-[0.2px]'>
                {dayjs(time).format('ddd, DD MMM YYYY')}
              </Text>
            </View>
          </View>

          <StarRating rating={rating} nonFillColor={nonFillColor} />
        </View>

        <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>{note}</Text>
      </View>
    </View>
  );
};

export default FeedbackItem;
