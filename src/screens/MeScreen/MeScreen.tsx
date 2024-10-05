import { Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '~components/ui/button';
import { OrderStatus } from '~graphql/graphql';
import { useStore } from '~store';
import { MeScreenNavigationProps } from '~types/navigation.type';
import { removeAccessToken } from '~utils/token-storage';

const MeScreen = ({ navigation }: MeScreenNavigationProps) => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const logout = async () => {
    unAuthenticate();
    removeAccessToken();
    await GoogleSignin.signOut();
  };

  const handleNavigateToMyOrders = (orderStatus: OrderStatus) => {
    navigation.navigate('MyOrdersScreen', { orderStatus });
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Button size='lg' variant='destructive' onPress={logout}>
        <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>Logout</Text>
      </Button>

      <View className='gap-[8px] mt-[8px]'>
        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderStatus.Unpaid)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to pay)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderStatus.Paid)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to ship)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderStatus.Delivering)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to receive)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderStatus.Delivered)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to rate)</Text>
        </Button>

        <Button size='lg' onPress={() => navigation.navigate('OrderHistoryScreen')}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders History</Text>
        </Button>
      </View>
    </View>
  );
};

export default MeScreen;
