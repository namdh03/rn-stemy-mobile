import { memo } from 'react';
import { Text, View } from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';

import constants from '~constants';
import { GetCreateTicketQuery } from '~graphql/graphql';

interface OrderProductItemProps {
  item: GetCreateTicketQuery['userLabs'][number]['orderItem'];
}

const OrderProductItem = ({ item }: OrderProductItemProps) => {
  return (
    <View className='flex-row items-center gap-[16px] p-[8px] rounded-[6px]'>
      <Image
        source={item.product.images[0].url}
        placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
        style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 4 }}
        contentFit='cover'
      />

      <View className='flex-1 items-start gap-[4px]'>
        <Text numberOfLines={1} className='font-inter-bold text-foreground text-[12px]'>
          {item.product.name}
        </Text>
        <Text className='font-inter-regular text-foreground text-[12px]'>Ticket: {item.tickets.length}/3</Text>
        <Text className='font-inter-regular text-foreground text-[12px]'>
          {dayjs(item.createdAt).format('DD-MM-YYYY')}
        </Text>
        <Text className='font-inter-regular text-muted-foreground text-[12px]'>
          ID: {btoa(btoa(btoa(btoa(item.id))))}
        </Text>
      </View>
    </View>
  );
};

export default memo(OrderProductItem);
