import { Text, View } from 'react-native';
import { Image } from 'expo-image';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { Info } from '~components/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '~components/ui/tooltip';
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
          style={{ width: 110, height: 110, alignSelf: 'center', borderRadius: 4 }}
          contentFit='cover'
        />
      </Pressable>
      <View className='flex-1 items-start gap-[10px] ml-[14px]'>
        <Text numberOfLines={1} className='font-inter-bold text-foreground text-[14px]'>
          {item.product.name}
        </Text>

        {item.hasLab ? (
          <Tooltip delayDuration={150}>
            <TooltipTrigger className='active:opacity-50'>
              <View className='flex-row items-center gap-[4px] px-[8px] py-[2px] rounded-md bg-green-50 border border-green-500'>
                <Text className='font-inter-medium text-green-600 text-[12px]'>Lab included</Text>
                <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-green-600' />
              </View>
            </TooltipTrigger>
            <TooltipContent className='py-2 px-4 shadow'>
              <Text className='font-inter-regular text-[16px]'>Only 1 unit with lab included</Text>
            </TooltipContent>
          </Tooltip>
        ) : (
          <View className='px-[8px] py-[2px] rounded-md bg-red-50 border border-red-500'>
            <Text className='font-inter-medium text-red-600 text-[12px]'>No Lab</Text>
          </View>
        )}

        <View className='flex-row items-center justify-between w-full'>
          <Text>x{item.quantity}</Text>

          <Text className='font-inter-extraBold text-left text-foreground text-[14px] break-words flex-shrink'>
            {(item.product.price * item.quantity).toLocaleString()} ₫
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CheckoutItem;
