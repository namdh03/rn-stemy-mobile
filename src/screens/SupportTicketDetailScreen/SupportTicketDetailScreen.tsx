import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image as RNImage,
  Modal,
  Pressable as RNPressable,
  RefreshControl,
  ScrollView,
  Text as RNText,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import Pressable from '~components/customs/Pressable';
import { Form, FormField, FormTextarea } from '~components/deprecated-ui/form';
import { CircleX, Download, X } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { TicketStatus } from '~graphql/graphql';
import { useRefreshByUser, useReplyTicket, useUploadImage } from '~hooks';
import { cn } from '~lib/utils';
import { GetTicketByIdQuery } from '~services/ticket.services';
import { SupportTicketDetailScreenNavigationProps } from '~types/navigation.type';
import capitalizeFirstLetter from '~utils/capitalizeFirstLetter';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

import { ReplyTicketFormType, replyTicketSchema } from './schema';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SupportTicketDetailScreen = ({ route, navigation }: SupportTicketDetailScreenNavigationProps) => {
  const queryClient = useQueryClient();
  const { data, refetch, isLoading } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_TICKET_BY_ID_QUERY_KEY, route.params.ticketId],
    queryFn: () => execute(GetTicketByIdQuery, { ticketId: +route.params.ticketId }),
    select: (data) => data.data.ticket,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const { images, selectImage, deleteImage, clearImages } = useUploadImage();
  const form = useForm<ReplyTicketFormType>({
    resolver: zodResolver(replyTicketSchema),
    defaultValues: {
      description: '',
      images,
    },
  });
  const imagesWatch = form.watch('images');
  const { mutate, isPending } = useReplyTicket(route.params.ticketId);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Update form when images change
  useEffect(() => {
    form.setValue('images', images);

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        // Check if form has data before unmounting
        const hasUnsavedData = !!form.getValues('description') || images.length > 0;

        // Prevent default back navigation if there is unsaved data
        if (hasUnsavedData) {
          e.preventDefault();

          // Show confirmation alert
          Alert.alert('Unsaved Changes', 'You have unsaved changes. Are you sure you want to leave?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                // Remove listener and reset form if the user confirms
                form.reset();
                navigation.dispatch(e.data.action);
              },
            },
          ]);
        } else {
          // No unsaved data, reset form and proceed
          form.reset();
          navigation.dispatch(e.data.action);
        }
      }
    });

    return unsubscribe;
  }, [images, form]);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const onSubmit = (values: ReplyTicketFormType) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [constants.TICKET_QUERY_KEY.GET_TICKET_BY_ID_QUERY_KEY, route.params.ticketId],
        });
        queryClient.invalidateQueries({
          queryKey: [constants.TICKET_QUERY_KEY.GET_STAFF_TICKET_BY_STATUS_QUERY_KEY, route.params.status],
        });
        form.reset();
        clearImages();
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('replyTicket'));
          if (error?.message) {
            return showDialogError({ textBody: error.message });
          }
        }
        showDialogError();
      },
    });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!data) return;

  return (
    <>
      <ScrollView
        contentContainerClassName='gap-[16px] p-[25px] py-[30px] mx-auto w-full max-w-xl'
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
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

              {data.replyImages.length !== 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
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
          </>
        )}

        {data.status === TicketStatus.Open && (
          <>
            <Separator className='bg-muted' />

            <View className='gap-[4px]'>
              <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
                Reply
                <Text className='font-inter-medium text-[#DC2626] text-[14px] leading-[20px]'> *</Text>
              </Text>

              <Form {...form}>
                <View className='gap-[16px]'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => <FormTextarea placeholder='Enter a description...' {...field} />}
                  />

                  {imagesWatch.length < 5 && (
                    <Pressable onPress={() => selectImage(true)}>
                      <View className='flex-row items-center gap-[16px]'>
                        <Text className='font-inter-medium text-foreground text-[14px]'>Upload Image</Text>
                        <Download className='text-foreground' size={24} strokeWidth={2.5} />
                      </View>
                    </Pressable>
                  )}

                  <View className='flex-row items-center gap-[12px]'>
                    {imagesWatch.map((image, index) => (
                      <View key={image.uri + index}>
                        <Pressable onPress={() => openImageModal(image.uri)}>
                          <RNImage
                            source={{ uri: image.uri }}
                            style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                            resizeMode='cover'
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => deleteImage(image)}
                          className='absolute top-[-6px] right-[-6px] p-1 bg-background rounded-full shadow z-10'
                        >
                          <CircleX className='text-destructive ' size={16} />
                        </Pressable>
                      </View>
                    ))}
                  </View>

                  <Button size='lg' disabled={isPending} onPress={form.handleSubmit(onSubmit)}>
                    {isPending ? (
                      <View className='flex-row items-center justify-center gap-[6px]'>
                        <ActivityIndicator className='text-secondary' />
                        <Text className='font-inter-semiBold text-secondary text-[16px]'>Loading...</Text>
                      </View>
                    ) : (
                      <RNText className='font-inter-semiBold text-secondary text-[16px]'>Send</RNText>
                    )}
                  </Button>
                </View>
              </Form>
            </View>
          </>
        )}
      </ScrollView>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: SCREEN_WIDTH * 0.9,
              maxHeight: SCREEN_HEIGHT * 0.8,
            }}
          >
            <RNPressable
              onPress={() => setModalVisible(false)}
              style={{
                alignSelf: 'flex-end',
                marginBottom: 10,
                padding: 5,
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 20,
              }}
            >
              <X size={24} className='text-foreground' />
            </RNPressable>
            {selectedImage && (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={selectedImage}
                  style={{
                    width: SCREEN_WIDTH * 0.8,
                    height: SCREEN_HEIGHT * 0.6,
                    borderRadius: 10,
                  }}
                  contentFit='contain'
                  transition={1000}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SupportTicketDetailScreen;
