import { ScrollView, View } from 'react-native';

import { Progress } from '~components/ui/progress';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import FeedbackItem from '~screens/ProductDetailScreen/components/FeedbackItem';
import StarRating from '~screens/ProductDetailScreen/components/StarRating';
import { ProductFeedbackScreenNavigationProps } from '~types/navigation';
import calculateStarRatings from '~utils/calculateStarRatings';
import nFormatter from '~utils/nFormatter';

const ProductFeedbackScreen = ({ route }: ProductFeedbackScreenNavigationProps) => {
  return (
    <ScrollView
      contentContainerClassName='px-[25px] py-[30px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='flex-row'>
        <View className='gap-[5px]'>
          <Text className='font-inter-bold text-foreground text-[30px] tracking-[3px]'>
            {route.params.rating}
            <Text className='font-inter-regular text-foreground text-[14px] tracking-[3px]'>/5</Text>
          </Text>
          <Text className='font-inter-regular text-foreground text-[14px] tracking-[0.2px]'>
            {route.params.feedbacks.length || 0} Reviews
          </Text>
        </View>

        <Separator orientation='vertical' className='ml-[18px] mr-[10px]' />

        <View className='flex-1 gap-[9px]'>
          {calculateStarRatings(route.params.feedbacks)
            .reverse()
            .map((feedback) => (
              <View key={feedback.star} className='flex-row'>
                <View className='flex-1 flex-row items-center gap-[10px]'>
                  <StarRating rating={feedback.star} nonFillColor='text-muted' />
                  <Progress
                    max={100}
                    value={feedback.percentage}
                    className='flex-1 h-[4px]'
                    indicatorClassName='bg-[#FFC120]'
                  />
                  <Text className='font-inter-medium text-right text-foreground text-[12px] tracking-[0.2px]'>
                    {nFormatter(feedback.count)}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>

      <View className='flex-1 gap-[20px] mt-[30px]'>
        {route.params.feedbacks.map((feedback) => (
          <FeedbackItem
            key={feedback.id}
            id={feedback.id}
            avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
            name={feedback.user.fullName}
            time={feedback.createdAt}
            rating={feedback.rating}
            comment={feedback.comment}
            nonFillColor='text-muted'
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductFeedbackScreen;
