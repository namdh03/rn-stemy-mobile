import { Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { Separator } from '~components/ui/separator';
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
    <View className='flex-1 gap-[12px] bg-background'>
      <View className='flex-row items-center px-[24px] pt-[16px]'>
        <Pressable onPress={handleNavigationToProductDetail}>
          <Image
            source={item.product.images[0]?.url}
            placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
            style={{ width: 90, height: 100, alignSelf: 'center', borderRadius: 4 }}
            contentFit='cover'
          />
        </Pressable>

        <View className='flex-1 items-start ml-[16px]'>
          <Text numberOfLines={1} className='font-inter-bold text-foreground text-[12px]'>
            {item.product.name}
          </Text>
          <Text className='font-inter-regular mt-[4px] text-[12px] text-muted-foreground leading-[16px] tracking-[0.12px]'>
            {item.hasLab ? 'Lab included' : 'No Lab'}
          </Text>

          <View className='flex-row items-center justify-between w-full mt-[14px]'>
            <Text className='font-inter-regular text-foreground text-[14px] leading-[20px]'>x{item.quantity}</Text>
            <Text className='font-inter-extraBold text-left text-foreground text-[14px] break-words flex-shrink'>
              {(item.product.price * item.quantity).toLocaleString()} ₫
            </Text>
          </View>
        </View>
      </View>

      <Separator className='bg-muted' />
    </View>
  );
};

export default CheckoutItem;
