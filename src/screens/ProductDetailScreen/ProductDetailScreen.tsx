import { Image, ScrollView, View } from 'react-native';

import FlexibleImage from '~components/customs/FlexibleImage';
import ProductList from '~components/customs/ProductList';
import { Star } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';

import FeedbackItem from './components/FeedbackItem';

const ProductDetailScreen = () => {
  return (
    <ScrollView
      contentContainerClassName='py-[25px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='px-[25px]'>
        <View className='w-[325px] h-[300px] p-[10px] rounded-[10px] bg-muted items-end justify-center'>
          <Image
            source={{
              uri: 'https://megatoys.vn/thumb_1000_1000_2/data/images/products/2022/06/10/cb70c3ee7716ec96598c129232ec4526_1654828014.jpg',
            }}
            className='w-full h-full'
          />
        </View>

        <View className='gap-[10px] mt-[30px]'>
          <Text className='font-inter-bold text-[24px] leading-[32px] tracking-[0.2px]'>TMA-2HD Wireless</Text>
          <Text className='font-inter-medium text-[16px] text-[#FE3A30] leading-[20px] tracking-[0.2px]'>
            1.500.000 ₫
          </Text>
          <View className='flex-row items-center mt-[10px]'>
            <View className='flex-row items-center gap-[4px]'>
              <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
              <Text className='font-inter-regular text-[14px] tracking-[0.2px]'>{4.6}</Text>
            </View>
            <Text className='font-inter-regular ml-[10px] text-[14px] tracking-[0.2px]'>{86} Reviews</Text>
            <View className='ml-auto px-[10px] py-[2px] bg-[#EEFAF6] rounded-[10px]'>
              <Text className='font-inter-medium text-primary text-[12px]'>Tersedia : 250</Text>
            </View>
          </View>
        </View>

        <Separator className='mt-[30px] mb-[20px]' />

        <View className='gap-[15px]'>
          <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
            Description Product
          </Text>
          <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>
            Robot STEM Rover – Coding kit sử dụng mạch lập trình Yolo:Bit, giúp làm quen với thế giới lập trình Robot dễ
            dàng và thú vị. Các bạn có thể tự tay lắp ráp, điều khiển và lập trình các tính năng hấp dẫn của một chú
            Robot theo phương pháp giáo dục STEM hiện đại.
          </Text>
          <FlexibleImage
            source={{
              uri: 'https://ohstem.vn/wp-content/uploads/2024/06/Robot-stem-rover-version-2-tai-ohstem-tich-hop-AI.png',
            }}
          />
          <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
            Detailed instruction book
          </Text>
          <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>
            Đi kèm với Rover là sách hướng dẫn lập trình chi tiết bao gồm nhiều bài học có hình ảnh minh hoạ, code mẫu
            và hướng dẫn từ A đến Z.
          </Text>
        </View>

        <Separator className='mt-[40px] mb-[30px]' />

        <View className='gap-[30px] mb-[30px]'>
          <View className='flex-row justify-between'>
            <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
              Review (86)
            </Text>
            <View className='flex-row items-center gap-[4px]'>
              <Star color='#FFC120' size={18} className='fill-[#FFC120]' />
              <Text className='font-inter-medium text-[16px] tracking-[0.2px]'>{4.6}</Text>
            </View>
          </View>

          <View className='flex-1 gap-[20px]'>
            <FeedbackItem
              id='1'
              avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
              name='Dương Hoàng Nam'
              time='2024-09-16T12:25:46.000Z'
              rating={4}
              comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />
            <FeedbackItem
              id='2'
              avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
              name='Dương Hoàng Nam'
              time='2024-09-16T12:25:46.000Z'
              rating={4}
              comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />
            <FeedbackItem
              id='3'
              avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
              name='Dương Hoàng Nam'
              time='2024-09-16T12:25:46.000Z'
              rating={4}
              comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            />

            <Button size='lg' variant='outline'>
              <Text className='font-inter-medium text-foreground leading-[20px]'>See All Review</Text>
            </Button>
          </View>
        </View>
      </View>

      <ProductList
        title='Featured Product'
        data={[
          {
            id: '1',
            imageUrl:
              'https://megatoys.vn/thumb_1000_1000_2/data/images/products/2022/06/10/cb70c3ee7716ec96598c129232ec4526_1654828014.jpg',
            numOfReviews: 10,
            price: 1500000,
            rating: 4.3,
            title: 'TMA-2 HD Wireless',
          },
          {
            id: '2',
            imageUrl:
              'https://megatoys.vn/thumb_1000_1000_2/data/images/products/2022/06/10/cb70c3ee7716ec96598c129232ec4526_1654828014.jpg',
            numOfReviews: 86,
            price: 1200000,
            rating: 4.3,
            title: 'TMA-2 HD Wireless',
          },
          {
            id: '3',
            imageUrl:
              'https://megatoys.vn/thumb_1000_1000_2/data/images/products/2022/06/10/cb70c3ee7716ec96598c129232ec4526_1654828014.jpg',
            numOfReviews: 10,
            price: 1200000,
            rating: 4.3,
            title: 'TMA-2 HD Wireless',
          },
        ]}
      />

      <View className='flex-row gap-[20px] px-[25px] pt-[12px] bg-destructive-foreground'>
        <Button className='flex-1' size='lg' variant='destructive'>
          <Text className='font-inter-medium text-white leading-[20px]'>Buy Now</Text>
        </Button>

        <Button className='flex-1' size='lg'>
          <Text className='font-inter-medium text-white leading-[20px]'>Add to Cart</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
