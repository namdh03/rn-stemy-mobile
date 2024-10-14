import { ScrollView, View } from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';

import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { TicketStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';
import { GetTicketByIdQuery } from '~services/ticket.services';
import { TicketDetailScreenNavigationProps } from '~types/navigation.type';
import capitalizeFirstLetter from '~utils/capitalizeFirstLetter';

const TicketDetailScreen = ({ route }: TicketDetailScreenNavigationProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_TICKET_BY_ID_QUERY_KEY],
    queryFn: () => execute(GetTicketByIdQuery, { ticketId: +route.params.ticketId }),
    select: (data) => data.data.ticket,
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!data) return;

  return (
    <ScrollView
      contentContainerClassName='gap-[16px] p-[25px] py-[30px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='gap-[12px]'>
        <Text className='font-inter-bold text-foreground text-[16px]'>{data.title}</Text>
        <Text className='font-inter-regular text-foreground text-[14px] leading-[16px] tracking-[0.14px]'>
          ＃Ticket {route.params.index + 1}: {data.category.name}
        </Text>
        <View
          className={cn('max-w-[50px] px-[8px] py-[2px] bg-background rounded-[6px] border shadow-sm', {
            'border-primary': data.status === TicketStatus.Open,
            'border-muted-foreground': data.status === TicketStatus.Close,
          })}
        >
          <Text
            className={cn('font-inter-medium text-[12px] text-center', {
              'text-primary ': data.status === TicketStatus.Open,
              'text-muted-foreground': data.status === TicketStatus.Close,
            })}
          >
            {capitalizeFirstLetter(data.status)}
          </Text>
        </View>
      </View>

      <Separator className='bg-muted' />

      <View className='flex-row items-center mt-[10px]'>
        <Image
          source={data.orderItem.product.images[0].url}
          placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
          style={{ width: 60, height: 60, alignSelf: 'center', borderRadius: 4 }}
          contentFit='cover'
        />

        <View className='flex-1 items-start ml-[10px]'>
          <Text
            numberOfLines={1}
            className='font-inter-medium text-foreground text-[14px] leading-[16px] tracking-[0.14px]'
          >
            {data.orderItem.product.name}
          </Text>
          <Text className='font-inter-regular text-[12px] text-foreground leading-[16px] tracking-[0.1px]'>
            Order product ID: {btoa(btoa(btoa(btoa(data.orderItem.id.toString()))))}
          </Text>
        </View>
      </View>

      <Separator className='bg-muted' />

      <View className='gap-[12px]'>
        <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
          {dayjs(data.createdAt).format('HH:mm DD-MM-YYYY')}
        </Text>

        {data.images.length !== 0 && (
          <View className='flex-row items-center gap-[12px]'>
            {data.images.map((image) => (
              <Image
                key={image.id}
                source={image.url}
                placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                contentFit='cover'
              />
            ))}
          </View>
        )}

        <View className='gap-[4px]'>
          <Text className='font-inter-medium text-primary text-[12px] leading-[16px]'>Reason:</Text>
          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
            {data.senderComment}
          </Text>
        </View>
      </View>

      <Separator className='bg-muted' />

      <View className='gap-[12px]'>
        <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
          {dayjs(data.closedAt).format('HH:mm DD-MM-YYYY')}
        </Text>

        {data.replyImages.length !== 0 && (
          <View className='flex-row items-center gap-[12px]'>
            {data.replyImages.map((image) => (
              <Image
                key={image.id}
                source={image.url}
                placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                contentFit='cover'
              />
            ))}
          </View>
        )}

        <View className='gap-[4px]'>
          <Text className='font-inter-medium text-primary text-[12px] leading-[16px]'>Reply:</Text>
          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
            {data.replierComment}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TicketDetailScreen;
