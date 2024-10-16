import { Image, RefreshControl, ScrollView, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useQuery } from '@tanstack/react-query';

import images from '~assets/images';
import Divider from '~components/customs/Divider';
import Pressable from '~components/customs/Pressable';
import { Box, ChevronRight, Pencil, Star, Truck, Wallet } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { useRefreshByUser } from '~hooks';
import { GetCountOrderQuery } from '~services/order.services';
import { useStore } from '~store';
import { MeScreenNavigationProps } from '~types/navigation.type';

const MeScreen = ({ navigation }: MeScreenNavigationProps) => {
  const { data, refetch } = useQuery({
    queryKey: [constants.ORDER_QUERY_KEY.GET_COUNT_ORDER_QUERY_KEY],
    queryFn: () => execute(GetCountOrderQuery),
    select: (data) => data.data.countOrder,
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const handleNavigateToMyOrders = (orderStatus: OrderStatus) => {
    if (orderStatus === OrderStatus.Paid || orderStatus === OrderStatus.Delivering) {
      navigation.navigate('MyOrdersScreen', { orderStatus: [OrderStatus.Paid, OrderStatus.Delivering] });
    } else {
      navigation.navigate('MyOrdersScreen', { orderStatus: [orderStatus] });
    }
  };

  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
    >
      {/* Avatar */}
      <View className='flex flex-col justify-center items-center py-[8px]'>
        <View className='relative'>
          <Image source={images.avatar} className='w-[80px] h-[80px] rounded-[32px]' />
          <Pressable className='absolute flex justify-center items-center bottom-0 right-0 w-[24px] h-[24px] p-[7px] rounded-[40px] bg-[#006FFD]'>
            <Pencil className='color-white' size={10} />
          </Pressable>
        </View>
        <Text className='font-inter-black leading-normal tracking-[0.08px] text-center color-[#1F2024] pt-[16px]'>
          {user?.fullName}
        </Text>
      </View>

      {/* My orders */}
      <View className='flex-col justify-center items-center gap-[24px] px-[24px] mt-[31px]'>
        <View className='flex-row items-center justify-between w-full'>
          <Text className='font-inter-bold leading-[20px] text-[16px] text-[#000]'>My Orders</Text>
          <Pressable onPress={() => navigation.navigate('OrderHistoryScreen')}>
            <View className='inline-flex items-center flex-row gap-[5px]'>
              <Text className='text-[14px] font-inter-regular leading-[20px]'>View Order History</Text>
              <ChevronRight size={18} className='color-[#8F9098]' />
            </View>
          </Pressable>
        </View>

        <View className='px-[26px] flex-row justify-between items-center w-full'>
          <Pressable onPress={() => handleNavigateToMyOrders(OrderStatus.Unpaid)}>
            <View className='flex-col justify-center items-center py-[4px]'>
              <Wallet size={24} className='color-accent-foreground mb-[3px]' />
              <Text className='font-inter-regular text-[#000] text-[12px]'>To Pay</Text>
              <Badge
                pointerEvents='none'
                className='absolute top-[-6px] right-[-9px] items-center justify-center p-0 w-[20px] h-[20px]'
              >
                <Text>{data?.unpaid || 0}</Text>
              </Badge>
            </View>
          </Pressable>

          <Pressable onPress={() => handleNavigateToMyOrders(OrderStatus.Paid)}>
            <View className='flex-col justify-center items-center py-[4px]'>
              <Box size={24} className='color-accent-foreground mb-[3px]' />
              <Text className='font-inter-regular text-[#000] text-[12px]'>To Ship</Text>
              <Badge
                pointerEvents='none'
                className='absolute top-[-6px] right-[-7px] items-center justify-center p-0 w-[20px] h-[20px]'
              >
                <Text>{data?.paid || 0}</Text>
              </Badge>
            </View>
          </Pressable>

          <Pressable onPress={() => handleNavigateToMyOrders(OrderStatus.Delivered)}>
            <View className='flex-col justify-center items-center py-[4px]'>
              <Truck size={26} className='color-accent-foreground mb-[3px]' />
              <Text className='font-inter-regular text-[#000] text-[12px]'>To Receive</Text>
              <Badge
                pointerEvents='none'
                className='absolute top-[-5px] right-[7px] items-center justify-center p-0 w-[20px] h-[20px]'
              >
                <Text>{data?.delivered || 0}</Text>
              </Badge>
            </View>
          </Pressable>

          <Pressable onPress={() => handleNavigateToMyOrders(OrderStatus.Received)}>
            <View className='flex-col justify-center items-center py-[4px]'>
              <View className='border-2 w-[27px] h-[27px] border-black rounded-full flex items-center justify-center p-[2px]'>
                <Star size={18} className='color-accent-foreground mb-[3px]' />
              </View>
              <Text className='font-inter-regular text-[#000] text-[12px]'>To Rate</Text>
              <Badge
                pointerEvents='none'
                className='absolute top-[-5px] right-[-10px] items-center justify-center p-0 w-[20px] h-[20px]'
              >
                <Text>{data?.received || 0}</Text>
              </Badge>
            </View>
          </Pressable>
        </View>
      </View>

      {/* List */}
      <View className='flex-col items-start self-stretch pt-[50px] px-[16px] gap-[2px]'>
        <Divider />
        <Pressable onPress={() => navigation.navigate('MyPurchasesScreen')}>
          <View className='flex-row items-center justify-between self-stretch p-[16px] w-full gap-[16px]'>
            <Text className='font-inter-regular text-[14px] text-[#1F2024] leading-[20px]'>My Purchases</Text>
            <ChevronRight size={18} className='color-[#8F9098]' />
          </View>
        </Pressable>

        <Divider />

        <Pressable onPress={() => navigation.navigate('MyTicketsScreen')}>
          <View className='flex-row items-center justify-between self-stretch p-[16px] w-full gap-[16px]'>
            <Text className='font-inter-regular text-[14px] text-[#1F2024] leading-[20px]'>My tickets</Text>
            <ChevronRight size={18} className='color-[#8F9098]' />
          </View>
        </Pressable>

        <Divider />

        <Pressable onPress={() => navigation.navigate('SettingsScreen')}>
          <View className='flex-row items-center justify-between self-stretch p-[16px] w-full gap-[16px]'>
            <Text className='font-inter-regular text-[14px] text-[#1F2024] leading-[20px]'>Setting</Text>
            <ChevronRight size={18} className='color-[#8F9098]' />
          </View>
        </Pressable>

        <Divider />

        {/* <Pressable onPress={() => navigation.navigate("FeedbackProductScreen")}>
          <View className='flex-row items-center justify-between self-stretch p-[16px] w-full gap-[16px]'>
            <Text className='font-inter-regular text-[14px] text-[#1F2024] leading-[20px]'>Feedback</Text>
            <ChevronRight size={18} className='color-[#8F9098]' />
          </View>
        </Pressable> */}
      </View>
    </ScrollView>
  );
};

export default MeScreen;
