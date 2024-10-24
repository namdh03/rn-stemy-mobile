import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image as RNImage,
  Modal,
  RefreshControl,
  ScrollView,
  Text as RNText,
  View,
} from 'react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { confirmDeliveredOrder, pickUpOrder } from '~api/order.api';
import EmptyList from '~components/customs/EmptyList';
import Pressable from '~components/customs/Pressable';
import PreviewImage from '~components/customs/PreviewImage';
import { Camera, CircleX, Image } from '~components/icons';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GetStaffListOrderQuery, OrderStatus } from '~graphql/graphql';
import { useUploadImage } from '~hooks';
import { cn } from '~lib/utils';
import showDialogError from '~utils/showDialogError';

import DeliveryItem from '../DeliveryItem';
import DeliverySkeleton from '../DeliverySkeleton';

interface DeliveryListProps {
  isLoading: boolean;
  data: GetStaffListOrderQuery['listOrders'];
  isRefetch: boolean;
  refetch: () => Promise<void>;
  status: OrderStatus;
}

const DeliveryList = ({ isLoading, data, isRefetch, refetch, status }: DeliveryListProps) => {
  const queryClient = useQueryClient();
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const orderIdRef = useRef<string>('');
  const { mutate: pickUpOrderMutate, isPending: isPickUpOrderPending } = useMutation({
    mutationFn: (orderId: string) => pickUpOrder(orderId),
  });
  const { mutate: confirmDeliveredOrderMutate, isPending: isConfirmDeliveredOrderPending } = useMutation({
    mutationFn: (orderId: string) => confirmDeliveredOrder(orderId),
  });

  const { images, selectImage, deleteImage, clearImages } = useUploadImage();

  // Handle order button text based on status
  const handleOrderButtonPress = useCallback(() => {
    switch (status) {
      case OrderStatus.Paid:
        return 'Pick up';
      case OrderStatus.Delivering:
        return 'Delivered';
      default:
        return '';
    }
  }, [status]);

  const handlePickUpOrder = () => {
    if (!orderIdRef.current) return;
    pickUpOrderMutate(orderIdRef.current, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [constants.ORDER_QUERY_KEY.GET_STAFF_LIST_ORDER_QUERY, status] });
        setPickupModalVisible(false);
      },
      onError: () => {
        showDialogError();
        setPickupModalVisible(false);
      },
    });
  };

  const handleCloseDeliveryModal = () => {
    clearImages();
    setDeliveryModalVisible(false);
  };

  const handleDeliveryOrder = () => {
    if (!orderIdRef.current) return;
    confirmDeliveredOrderMutate(orderIdRef.current, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [constants.ORDER_QUERY_KEY.GET_STAFF_LIST_ORDER_QUERY, status] });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
          textBody: constants.MESSAGES.ORDER_MESSAGES.DELIVERED_ORDER_SUCCESS,
          autoClose: 1000,
        });
        setDeliveryModalVisible(false);
      },
      onError: () => {
        showDialogError();
        setDeliveryModalVisible(false);
      },
    });
  };

  // Render the delivery item with memoized callback
  const renderDeliveryItem = useCallback(
    ({ item }: { item: GetStaffListOrderQuery['listOrders'][number] }) => {
      const buttonText = handleOrderButtonPress();

      const handlePress = (orderId: string) => {
        orderIdRef.current = orderId;
        if (status === OrderStatus.Paid) {
          setPickupModalVisible(true);
        } else if (status === OrderStatus.Delivering) {
          setDeliveryModalVisible(true);
        }
      };

      return <DeliveryItem item={item} buttonText={buttonText} onPress={handlePress} />;
    },
    [handleOrderButtonPress, status],
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: GetStaffListOrderQuery['listOrders'][number]) => item.id, []);

  // Predefine number of skeletons for loading state
  const skeletonItems = useMemo(() => [...Array(5)], []);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  return (
    <>
      <View className='flex-1 mx-auto w-full max-w-xl h-full pb-[180px]'>
        {isLoading ? (
          <FlatList
            data={skeletonItems}
            renderItem={() => <DeliverySkeleton />}
            keyExtractor={(_, index) => `skeleton-${index}`}
            showsVerticalScrollIndicator={false}
            className='flex-1'
            contentContainerStyle={{ gap: 16, paddingBottom: 50 }}
          />
        ) : data.length === 0 ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} />}
          >
            <EmptyList message={`You have no orders to deliver.`} />
          </ScrollView>
        ) : (
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderDeliveryItem}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefetch} onRefresh={refetch} />}
            className='flex-1'
            contentContainerStyle={{ gap: 24, paddingBottom: 50 }}
          />
        )}
      </View>
      {/* Modal for Pickup Confirmation */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={pickupModalVisible}
        onRequestClose={() => setPickupModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-gray-900/60'>
          <View className='w-4/5 bg-background rounded-lg p-6'>
            <Text className='font-inter-semiBold text-foreground text-lg font-semibold mb-2'>
              Confirm Pickup Completion
            </Text>
            <Text className='font-inter-regular text-sm text-muted-foreground mb-6'>
              Confirm you’ve picked up the order and are ready to deliver.
            </Text>
            <View className='flex-row justify-end gap-[16px]'>
              <Button
                variant={'secondary'}
                className='min-w-[80px]'
                onPress={() => setPickupModalVisible(false)}
                size='sm'
              >
                <RNText className='font-inter-semiBold text-foreground text-[12px]'>Cancel</RNText>
              </Button>

              <Button disabled={isPickUpOrderPending} className='min-w-[80px]' onPress={handlePickUpOrder} size='sm'>
                {isPickUpOrderPending ? (
                  <View className='flex-row items-center justify-center gap-[6px]'>
                    <ActivityIndicator className='text-secondary' size={'small'} />
                  </View>
                ) : (
                  <RNText className='font-inter-semiBold text-background text-[12px]'>Confirm</RNText>
                )}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Delivery Confirmation */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={deliveryModalVisible}
        onRequestClose={() => setDeliveryModalVisible(false)}
      >
        <View className='flex-1 justify-center items-center bg-gray-900/60'>
          <View className='w-4/5 bg-background rounded-lg p-6'>
            <Text className='font-inter-semiBold text-foreground text-lg font-semibold mb-2'>Confirm Delivery</Text>
            <Text className='font-inter-regular text-sm text-muted-foreground mb-4'>
              Confirm that the order has been successfully delivered to the customer.
            </Text>
            <Text className='font-inter-regular text-foreground text-sm mb-4'>Please upload evidence</Text>

            <View className='flex-row justify-center gap-[8px] mb-6'>
              <Pressable
                disabled={images.length >= 5}
                className={cn('bg-[#16A34A1A] rounded-[6px]', {
                  'opacity-50': images.length >= 5,
                })}
                onPress={() => selectImage(false)}
              >
                <View className='items-center gap-[2px] min-w-[80px] p-[14px]'>
                  <Camera className='text-foreground ' />
                  <Text className='font-inter-regular text-foreground text-[14px] leading-[20px]'>Camera</Text>
                </View>
              </Pressable>
              <Pressable
                disabled={images.length >= 5}
                className={cn('bg-[#16A34A1A] rounded-[6px]', {
                  'opacity-50': images.length >= 5,
                })}
                onPress={() => selectImage(true)}
              >
                <View className='items-center gap-[2px] min-w-[80px] p-[14px]'>
                  <Image className='text-foreground ' />
                  <Text className='font-inter-regular text-foreground text-[14px] leading-[20px]'>Gallery</Text>
                </View>
              </Pressable>
            </View>

            <View className='flex-row flex-wrap items-center gap-[12px] mb-6'>
              {images.map((image, index) => (
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

            <View className='flex-row justify-end gap-[16px]'>
              <Button variant={'secondary'} className='min-w-[80px]' onPress={handleCloseDeliveryModal} size='sm'>
                <RNText className='font-inter-semiBold text-foreground text-[12px]'>Cancel</RNText>
              </Button>

              <Button
                disabled={isConfirmDeliveredOrderPending || images.length === 0}
                className='min-w-[80px]'
                onPress={handleDeliveryOrder}
                size='sm'
              >
                {isConfirmDeliveredOrderPending ? (
                  <View className='flex-row items-center justify-center gap-[6px]'>
                    <ActivityIndicator className='text-secondary' size={'small'} />
                  </View>
                ) : (
                  <RNText className='font-inter-semiBold text-background text-[12px]'>Confirm</RNText>
                )}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <PreviewImage image={selectedImage} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export default DeliveryList;
