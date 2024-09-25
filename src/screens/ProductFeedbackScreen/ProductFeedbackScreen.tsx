import { ScrollView, View } from 'react-native';

import { Progress } from '~components/ui/progress';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import FeedbackItem from '~screens/ProductDetailScreen/components/FeedbackItem';
import StarRating from '~screens/ProductDetailScreen/components/StarRating';
import nFormatter from '~utils/nFormatter';

const ProductFeedbackScreen = () => {
  return (
    <ScrollView
      contentContainerClassName='px-[25px] py-[30px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='flex-row'>
        <View className='gap-[5px]'>
          <Text className='font-inter-bold text-foreground text-[30px] tracking-[3px]'>
            4.6
            <Text className='font-inter-regular text-foreground text-[14px] tracking-[3px]'>/5</Text>
          </Text>
          <Text className='font-inter-regular text-foreground text-[14px] tracking-[0.2px]'>86 Reviews</Text>
        </View>

        <Separator orientation='vertical' className='ml-[18px] mr-[10px]' />

        <View className='flex-1 gap-[9px]'>
          <View className='flex-row'>
            <View className='flex-1 flex-row items-center gap-[10px]'>
              <StarRating rating={5} nonFillColor='text-muted' />
              <Progress max={100} value={90} className='flex-1 h-[4px]' indicatorClassName='bg-[#FFC120]' />
              <Text className='font-inter-medium  text-right text-foreground text-[12px] tracking-[0.2px]'>
                {nFormatter(12)}
              </Text>
            </View>
          </View>
          <View className='flex-row'>
            <View className='flex-1 flex-row items-center gap-[10px]'>
              <StarRating rating={4} nonFillColor='text-muted' />
              <Progress max={100} value={90} className='flex-1 h-[4px]' indicatorClassName='bg-[#FFC120]' />
              <Text className='font-inter-medium  text-right text-foreground text-[12px] tracking-[0.2px]'>
                {nFormatter(12)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className='flex-1 gap-[20px] mt-[30px]'>
        <FeedbackItem
          id='1'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
        <FeedbackItem
          id='2'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
        <FeedbackItem
          id='3'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
        <FeedbackItem
          id='4'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
        <FeedbackItem
          id='5'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
        <FeedbackItem
          id='6'
          avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
          name='Dương Hoàng Nam'
          time='2024-09-16T12:25:46.000Z'
          rating={4}
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          nonFillColor='text-muted'
        />
      </View>
    </ScrollView>
  );
};

export default ProductFeedbackScreen;
