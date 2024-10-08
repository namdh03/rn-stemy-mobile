import { Image, View } from 'react-native';

import images from '~assets/images';
import { Text } from '~components/ui/text';

interface EmptyOrderListProps {
  message?: string;
}

const EmptyOrderList = ({ message = "You don't have any orders in this category." }: EmptyOrderListProps) => (
  <View className='flex-1 items-center py-10'>
    <Image source={images.searchOrders} style={{ width: 135, height: 128 }} resizeMode='cover' />
    <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>{message}</Text>
  </View>
);

export default EmptyOrderList;
