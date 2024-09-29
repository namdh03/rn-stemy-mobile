import { Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import constants from '~constants';
import { GetCartQuery } from '~graphql/graphql';
import { MainStackParamList } from '~types/navigation.type';

interface CheckoutItemProps {
  item: GetCartQuery['carts'][number];
}

const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleNavigationToProductDetail = () => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: {
        id: item.product.id,
      },
    });
  };

  return (
    <View className='flex-row items-center'>
      <Pressable onPress={handleNavigationToProductDetail}>
        <Image
          source={item.product.images[0]?.url}
          placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
          style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 4 }}
          contentFit='cover'
        />
      </Pressable>
      <View className='flex-1 items-start ml-[16px]'>
        <Text numberOfLines={1} className='font-inter-bold text-foreground text-[12px]'>
          {item.product.name}
        </Text>

        {item.hasLab ? (
          <Text className='font-inter-medium text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
            Lab included
          </Text>
        ) : (
          <Text className='font-inter-medium text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
            No Lab
          </Text>
        )}

        <View className='flex-row items-center justify-between w-full mt-[14px]'>
          <Text className='font-inter-regular text-foreground text-[16px] leading-[20px]'>x{item.quantity}</Text>
          <Text className='font-inter-extraBold text-left text-foreground text-[14px] break-words flex-shrink pr-[24px]'>
            {(item.product.price * item.quantity).toLocaleString()} ₫
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CheckoutItem;
