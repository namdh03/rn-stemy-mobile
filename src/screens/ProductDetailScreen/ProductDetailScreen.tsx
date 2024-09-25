import { Image, ScrollView, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import FlexibleImage from '~components/customs/FlexibleImage';
import ProductList from '~components/customs/ProductList';
import { Star } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { GET_PRODUCT_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
import { GetProduct } from '~services/product.services';
import { ProductDetailScreenNavigationProps } from '~types/navigation';

import FeedbackItem from './components/FeedbackItem';

// TODO: Uncomment later
// const MAX_FEEDBACK_DISPLAY = 4;

const ProductDetailScreen = ({ route, navigation }: ProductDetailScreenNavigationProps) => {
  const { data } = useQuery({
    queryKey: [GET_PRODUCT_QUERY_KEY],
    queryFn: () => execute(GetProduct, { id: route.params.id }),
    select: (data) => data.data,
  });

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
          <Text className='font-inter-bold text-[24px] leading-[32px] tracking-[0.2px]'>{data?.product.name}</Text>
          <Text className='font-inter-medium text-[16px] text-[#FE3A30] leading-[20px] tracking-[0.2px]'>
            {data?.product.price.toLocaleString()} ₫
          </Text>
          <View className='flex-row items-center mt-[10px]'>
            <View className='flex-row items-center gap-[4px]'>
              <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
              <Text className='font-inter-regular text-[14px] tracking-[0.2px]'>{data?.product.rating}</Text>
            </View>
            <Text className='font-inter-regular ml-[10px] text-[14px] tracking-[0.2px]'>
              {data?.product.feedbacks.length || 0} Reviews
            </Text>
            <View className='ml-auto px-[10px] py-[2px] bg-[#EEFAF6] rounded-[10px]'>
              <Text className='font-inter-medium text-primary text-[12px]'>Sold : {data?.product.sold}</Text>
            </View>
          </View>
        </View>

        <Separator className='mt-[30px] mb-[20px]' />

        <View className='gap-[15px]'>
          <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
            Description Product
          </Text>
          <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>
            {data?.product.description}
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
            Included with the <Text className='font-inter-medium text-primary'>{data?.product.name}</Text> is a detailed
            programming guide, featuring multiple lessons with illustrations, sample code, and step-by-step instructions
            from A to Z.
          </Text>
        </View>

        <Separator className='mt-[40px] mb-[30px]' />

        <View className='gap-[30px] mb-[30px]'>
          <View className='flex-row justify-between'>
            <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
              Review ({data?.product.feedbacks.length || 0})
            </Text>
            <View className='flex-row items-center gap-[4px]'>
              <Star color='#FFC120' size={18} className='fill-[#FFC120]' />
              <Text className='font-inter-medium text-[16px] tracking-[0.2px]'>{data?.product.rating}</Text>
            </View>
          </View>

          <View className='flex-1 gap-[20px]'>
            {data?.product.feedbacks.map((feedback) => (
              <FeedbackItem
                key={feedback.id}
                id={feedback.id}
                avatar='https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg'
                name={feedback.user.fullName}
                time={feedback.createdAt}
                rating={feedback.rating}
                comment={feedback.comment}
              />
            ))}

            {/* // TODO: Uncomment later */}
            {/* {(data?.product.feedbacks.length || 0) > MAX_FEEDBACK_DISPLAY && ( */}
            <Button
              size='lg'
              variant='outline'
              onPress={() =>
                navigation.navigate('ProductFeedbackScreen', {
                  rating: route.params.id,
                  feedbacks: data?.product.feedbacks || [],
                })
              }
            >
              <Text className='font-inter-medium text-foreground leading-[20px]'>See All Review</Text>
            </Button>
            {/* )} */}
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
