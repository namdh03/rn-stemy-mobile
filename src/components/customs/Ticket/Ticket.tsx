import { View } from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';

import Pressable from '~components/customs/Pressable';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GetMyTicketsQuery, TicketStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';
import capitalizeFirstLetter from '~utils/capitalizeFirstLetter';

export interface TicketProps {
  index: number;
  item: GetMyTicketsQuery['myTickets'][number];
  onPress: () => void;
}

const Ticket = ({ index, item, onPress }: TicketProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className={cn('w-full pl-[6px] pt-[6px] pb-[12px] pr-[12px] bg-background rounded-[6px] border-l-[20px]', {
          'border-primary': item.status === TicketStatus.Open,
          'border-muted-foreground': item.status === TicketStatus.Close,
        })}
      >
        <View className='flex-row justify-between'>
          <View>
            <Text className='font-inter-bold text-foreground text-[14px]'>{item.title}</Text>
            <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              ＃Ticket {index + 1}: {item.category.name}
            </Text>
          </View>
          <View className='mt-[3px]'>
            <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              {dayjs(item.createdAt).format('DD-MM-YYYY')}
            </Text>
            <View
              className={cn('mt-[6px] px-[8px] py-[2px] bg-background rounded-[6px] border shadow-sm', {
                'border-primary': item.status === TicketStatus.Open,
                'border-muted-foreground': item.status === TicketStatus.Close,
              })}
            >
              <Text
                className={cn('font-inter-medium text-[12px] text-center', {
                  'text-primary ': item.status === TicketStatus.Open,
                  'text-muted-foreground': item.status === TicketStatus.Close,
                })}
              >
                {capitalizeFirstLetter(item.status)}
              </Text>
            </View>
          </View>
        </View>

        <View className='flex-row items-center mt-[10px]'>
          <Image
            source={item.orderItem.product.images[0].url}
            placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
            style={{ width: 40, height: 40, alignSelf: 'center', borderRadius: 4 }}
            contentFit='cover'
          />

          <View className='flex-1 items-start ml-[10px]'>
            <Text
              numberOfLines={1}
              className='font-inter-medium text-foreground text-[12px] leading-[16px] tracking-[0.12px]'
            >
              {item.orderItem.product.name}
            </Text>
            <Text className='font-inter-regular text-[10px] text-foreground leading-[16px] tracking-[0.12px]'>
              Order product ID: {btoa(btoa(btoa(btoa(item.orderItem.id.toString()))))}
            </Text>
          </View>
        </View>

        <View className='mt-[8px]'>
          <Text
            numberOfLines={2}
            className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.12px]'
          >
            <Text className='font-inter-medium text-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
              Reason:{' '}
            </Text>
            {item.senderComment}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Ticket;
