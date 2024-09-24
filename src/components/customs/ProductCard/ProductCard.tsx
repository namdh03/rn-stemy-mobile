import { Image, ImageSourcePropType, View } from 'react-native';

import { EllipsisVertical, Star } from '~components/icons';
import { Text } from '~components/ui/text';

export interface ProductCardProps {
  id: string;
  imageUrl: ImageSourcePropType | string;
  title: string;
  price: number;
  rating: number;
  numOfReviews: number;
}

const ProductCard = ({ id, imageUrl, title, price, rating, numOfReviews }: ProductCardProps) => {
  return (
    <View
      id={id}
      className='p-[15px] w-full max-w-[186px] rounded-[10px] border border-[#0000000d] bg-card shadow-sm shadow-foreground/10'
    >
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        width={155}
        height={155}
        className='self-center'
      />
      <Text className='font-inter-medium mt-[20px] text-[16px] tracking-[0.2px]'>{title}</Text>
      <Text className='font-inter-bold mt-[4px] text-[14px] tracking-[0.2px] text-[#FE3A30]'>
        {price.toLocaleString()} ₫
      </Text>
      <View className='flex-row items-center mt-[10px]'>
        <View className='flex-row items-center gap-[4px]'>
          <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
          <Text className='font-inter-regular text-[12px] tracking-[0.2px]'>{rating}</Text>
        </View>
        <Text className='font-inter-regular ml-[12px] text-[12px] tracking-[0.2px]'>{numOfReviews} Reviews</Text>
        <EllipsisVertical size={20} className='ml-auto text-muted-foreground' />
      </View>
    </View>
  );
};

export default ProductCard;
