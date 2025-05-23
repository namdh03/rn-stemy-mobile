import { memo } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Star } from '~components/icons';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { RootStackParamList } from '~types/navigation.type';

import Pressable from '../Pressable';

export interface ProductCardProps {
  id: string;
  imageUrl: ImageSourcePropType | string;
  title: string;
  price: number;
  rating: number;
  numOfReviews: number;
}

const ProductCard = ({ id, imageUrl, title, price, rating, numOfReviews }: ProductCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handleNavigateToProductDetail() {
    navigation.push('RootDrawer', {
      screen: 'ProductDetailScreen',
      params: { id },
    });
  }

  return (
    <Pressable
      onPress={handleNavigateToProductDetail}
      className='p-[12px] w-full rounded-[10px] border border-[#0000000d] bg-card shadow-sm shadow-foreground/10'
    >
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
        style={{ width: '100%', height: 155, alignSelf: 'center', borderRadius: 4 }}
        contentFit='contain'
      />
      <Text numberOfLines={1} className='font-inter-medium mt-[20px] text-[16px] tracking-[0.2px]'>
        {title}
      </Text>
      <Text className='font-inter-bold mt-[4px] text-[14px] tracking-[0.2px] text-[#FE3A30]'>
        {price.toLocaleString()} ₫
      </Text>
      <View className='w-full flex-row items-center mt-[10px]'>
        <View className='flex-row items-center gap-[4px]'>
          <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
          <Text className='font-inter-regular text-[12px] tracking-[0.2px]'>{rating}</Text>
        </View>
        <Text className='font-inter-regular ml-[12px] text-[12px] tracking-[0.2px]'>
          {numOfReviews} {numOfReviews === 1 || numOfReviews === 0 ? 'Review' : 'Reviews'}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(ProductCard);
