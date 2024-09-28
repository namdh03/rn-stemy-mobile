import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { EllipsisVertical, Star } from '~components/icons';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { MainStackParamList, ProductDetailStackParamList } from '~types/navigation.type';

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
  const route: RouteProp<ProductDetailStackParamList, 'ProductDetailScreen'> = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  function handleNavigateToProductDetail() {
    if (route.name == 'ProductDetailScreen') {
      if (!route.params || route.params.id === id) return;
      navigation.push('ProductDetailStack', {
        screen: 'ProductDetailScreen',
        params: { id },
      });
    } else {
      navigation.navigate('ProductDetailStack', {
        screen: 'ProductDetailScreen',
        params: { id },
      });
    }
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
        contentFit='cover'
      />
      <Text className='font-inter-medium mt-[20px] text-[16px] tracking-[0.2px]'>{title}</Text>
      <Text className='font-inter-bold mt-[4px] text-[14px] tracking-[0.2px] text-[#FE3A30]'>
        {price.toLocaleString()} ₫
      </Text>
      <View className='w-full flex-row items-center mt-[10px]'>
        <View className='flex-row items-center gap-[4px]'>
          <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
          <Text className='font-inter-regular text-[12px] tracking-[0.2px]'>{rating}</Text>
        </View>
        <Text className='font-inter-regular ml-[12px] text-[12px] tracking-[0.2px]'>{numOfReviews} Reviews</Text>
        <EllipsisVertical size={20} className='ml-auto text-muted-foreground' />
      </View>
    </Pressable>
  );
};

export default ProductCard;
