import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text as RNText, View } from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import { showAlertModal } from '~components/customs/Modal/Modal';
import Pressable from '~components/customs/Pressable';
import PreviewImage from '~components/customs/PreviewImage';
import { Angry, Frown, Laugh, Meh, Smile } from '~components/icons';
import { Button } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { TicketStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';
import { GetTicketByIdQuery, RatingTicketMutation } from '~services/ticket.services';
import { ALERT_TYPE } from '~store/modal/modal.type';
import { TicketDetailScreenNavigationProps } from '~types/navigation.type';
import capitalizeFirstLetter from '~utils/capitalizeFirstLetter';
import isErrors from '~utils/responseChecker';

const TicketDetailScreen = ({ route }: TicketDetailScreenNavigationProps) => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_TICKET_BY_ID_QUERY_KEY, route.params.ticketId],
    queryFn: () => execute(GetTicketByIdQuery, { ticketId: +route.params.ticketId }),
    select: (data) => data.data.ticket,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (rating: number) => execute(RatingTicketMutation, { rating, ticketId: +route.params.ticketId }),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const handleRatingTicket = () => {
    mutate(rating, {
      onSuccess: async () => {
        showAlertModal({
          type: ALERT_TYPE.SUCCESS,
          title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
          message: constants.MESSAGES.TICKET_MESSAGES.RATING_TICKET_TEXT_BODY,
          autoClose: true,
          autoCloseTime: 1000,
        });

        queryClient.invalidateQueries({
          queryKey: [constants.TICKET_QUERY_KEY.GET_TICKET_BY_ID_QUERY_KEY, route.params.ticketId],
        });
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('ratingTicket'));
          if (error?.message) {
            return showAlertModal({
              type: ALERT_TYPE.DANGER,
              title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
              message: errors.message,
              autoClose: true,
              autoCloseTime: 1500,
            });
          }
        }
        showAlertModal({
          type: ALERT_TYPE.DANGER,
          title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
          message: constants.MESSAGES.SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
          autoClose: true,
          autoCloseTime: 1500,
        });
      },
    });
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }
  if (!data) return;

  return (
    <>
      <ScrollView
        contentContainerClassName='gap-[16px] p-[25px] pt-[30px] pb-[70px] mx-auto w-full max-w-xl'
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <View className='gap-[12px]'>
          <Text className='font-inter-bold text-foreground text-[16px]'>{data.title}</Text>
          <Text className='font-inter-regular text-foreground text-[14px] leading-[16px] tracking-[0.14px]'>
            ＃Ticket {route.params.index + 1}: {data.category.name}
          </Text>
          <View
            className={cn('max-w-[60px] px-[8px] py-[2px] bg-background rounded-[6px] border shadow-sm', {
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
                <Pressable key={image.id} onPress={() => openImageModal(image.url)}>
                  <Image
                    source={image.url}
                    placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                    style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                    contentFit='cover'
                  />
                </Pressable>
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

        {data.status === TicketStatus.Close && (
          <>
            <Separator className='bg-muted' />

            <View className='gap-[12px]'>
              <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
                {dayjs(data.closedAt).format('HH:mm DD-MM-YYYY')}
              </Text>

              <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[16px] tracking-[0.12px]'>
                Staff name: {data.replier.fullName}
              </Text>

              {data.replyImages.length !== 0 && (
                <View className='flex-row items-center gap-[12px]'>
                  {data.replyImages.map((image) => (
                    <Pressable key={image.id} onPress={() => openImageModal(image.url)}>
                      <Image
                        source={image.url}
                        placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                        style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                        contentFit='cover'
                      />
                    </Pressable>
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

            {data.rating ? (
              <View className='gap-[16px] items-center'>
                <Text className='self-start font-inter-medium text-foreground text-[14px] leading-[20px]'>
                  Rating service
                </Text>

                <View className='flex flex-row gap-[18px]'>
                  <View className='items-center'>
                    <Angry size={32} className={rating === 1 ? 'text-primary' : 'text-muted-foreground'} />
                    {rating === 1 && (
                      <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                        Very poor
                      </Text>
                    )}
                  </View>
                  <View className='items-center'>
                    <Frown size={32} className={rating === 2 ? 'text-primary' : 'text-muted-foreground'} />
                    {rating === 2 && (
                      <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                        Poor
                      </Text>
                    )}
                  </View>
                  <View className='items-center'>
                    <Meh size={32} className={rating === 3 ? 'text-primary' : 'text-muted-foreground'} />
                    {rating === 3 && (
                      <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                        Average
                      </Text>
                    )}
                  </View>
                  <View className='items-center'>
                    <Smile size={32} className={rating === 4 ? 'text-primary' : 'text-muted-foreground'} />
                    {rating === 4 && (
                      <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                        Good
                      </Text>
                    )}
                  </View>
                  <View className='items-center'>
                    <Laugh size={32} className={rating === 5 ? 'text-primary' : 'text-muted-foreground'} />
                    {rating === 5 && (
                      <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                        Excellent
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <Card className='w-full p-[16px]'>
                <View className='gap-[16px] items-center'>
                  <Text className='self-start font-inter-medium text-foreground text-[14px] leading-[20px]'>
                    Rating service
                  </Text>

                  <View className='flex flex-row gap-[18px]'>
                    <Pressable onPress={() => setRating(1)}>
                      <View className='items-center'>
                        <Angry size={32} className={rating === 1 ? 'text-primary' : 'text-muted-foreground'} />
                        {rating === 1 && (
                          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                            Very poor
                          </Text>
                        )}
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setRating(2)}>
                      <View className='items-center'>
                        <Frown size={32} className={rating === 2 ? 'text-primary' : 'text-muted-foreground'} />
                        {rating === 2 && (
                          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                            Poor
                          </Text>
                        )}
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setRating(3)}>
                      <View className='items-center'>
                        <Meh size={32} className={rating === 3 ? 'text-primary' : 'text-muted-foreground'} />
                        {rating === 3 && (
                          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                            Average
                          </Text>
                        )}
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setRating(4)}>
                      <View className='items-center'>
                        <Smile size={32} className={rating === 4 ? 'text-primary' : 'text-muted-foreground'} />
                        {rating === 4 && (
                          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                            Good
                          </Text>
                        )}
                      </View>
                    </Pressable>
                    <Pressable onPress={() => setRating(5)}>
                      <View className='items-center'>
                        <Laugh size={32} className={rating === 5 ? 'text-primary' : 'text-muted-foreground'} />
                        {rating === 5 && (
                          <Text className='font-inter-regular text-foreground text-[12px] leading-[16px] tracking-[0.4px]'>
                            Excellent
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  </View>

                  <Button disabled={isPending} className='min-w-[100px]' size='sm' onPress={handleRatingTicket}>
                    {isPending ? (
                      <View className='flex-row items-center justify-center gap-[6px]'>
                        <ActivityIndicator className='text-secondary' />
                        <RNText className='font-inter-semiBold text-primary-foreground text-[12px]'>Loading...</RNText>
                      </View>
                    ) : (
                      <RNText className='font-inter-semiBold text-primary-foreground text-[12px]'>Send</RNText>
                    )}
                  </Button>
                </View>
              </Card>
            )}
          </>
        )}
      </ScrollView>

      <PreviewImage image={selectedImage} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default TicketDetailScreen;
