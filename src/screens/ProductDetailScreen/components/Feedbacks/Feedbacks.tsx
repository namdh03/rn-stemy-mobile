import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Star } from '~components/icons';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { RootStackParamList } from '~types/navigation.type';

import FeedbackItem from '../FeedbackItem';

const MAX_FEEDBACK_DISPLAY = 4;

const Feedbacks = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { rating, feedbacks } = useStore(
    useShallow((state) => ({
      rating: state.rating,
      feedbacks: state.feedbacks,
    })),
  );

  return (
    <View className='gap-[30px] mb-[30px]'>
      <View className='flex-row justify-between'>
        <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
          Review ({feedbacks.length || 0})
        </Text>
        <View className='flex-row items-center gap-[4px]'>
          <Star color='#FFC120' size={18} className='fill-[#FFC120]' />
          <Text className='font-inter-medium text-[16px] tracking-[0.2px]'>{rating}</Text>
        </View>
      </View>

      <View className='flex-1 gap-[20px]'>
        {feedbacks.slice(0, 4).map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            id={feedback.id}
            avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
            name={feedback.user.fullName}
            time={feedback.createdAt}
            rating={feedback.rating}
            note={feedback.note}
          />
        ))}

        {(feedbacks.length || 0) > MAX_FEEDBACK_DISPLAY && (
          <Button
            size='lg'
            variant='outline'
            onPress={() =>
              navigation.push('RootDrawer', {
                screen: 'ProductFeedbackScreen',
                params: {
                  rating,
                },
              })
            }
          >
            <Text className='font-inter-medium text-foreground leading-[20px]'>See All Review</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Feedbacks;
