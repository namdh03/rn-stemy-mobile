import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text as RNText,
  View,
} from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { pickUpOrder } from '~api/order.api';
import EmptyList from '~components/customs/EmptyList';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GetStaffListOrderQuery, OrderStatus } from '~graphql/graphql';
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
  const orderIdRef = useRef<string>('');
  const { mutate, isPending } = useMutation({
    mutationFn: (orderId: string) => pickUpOrder(orderId),
  });

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
    mutate(orderIdRef.current, {
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

  const handleDeliveryOrder = () => {
    console.log('DELIVERY CONFIRMED');
    setDeliveryModalVisible(false);
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

              <Button disabled={isPending} className='min-w-[80px]' onPress={handlePickUpOrder} size='sm'>
                {isPending ? (
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
            <View className='flex-row justify-between mb-6'>
              {/* // TODO: Remove Later */}
              <Pressable className='bg-gray-100 p-4 rounded-lg'>
                <Text>Camera</Text>
              </Pressable>
              <Pressable className='bg-gray-100 p-4 rounded-lg'>
                <Text>Gallery</Text>
              </Pressable>
            </View>
            <View className='flex-row justify-end gap-[16px]'>
              <Button
                variant={'secondary'}
                className='min-w-[80px]'
                onPress={() => setDeliveryModalVisible(false)}
                size='sm'
              >
                <RNText className='font-inter-semiBold text-foreground text-[12px]'>Cancel</RNText>
              </Button>

              <Button className='min-w-[80px]' onPress={handleDeliveryOrder} size='sm'>
                <RNText className='font-inter-semiBold text-background text-[12px]'>Confirm</RNText>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DeliveryList;
