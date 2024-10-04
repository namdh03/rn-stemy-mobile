import { Text, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '~components/ui/button';
import { useStore } from '~store';
import { MeScreenNavigationProps } from '~types/navigation.type';
import { OrderTab } from '~utils/enum';
import { removeAccessToken } from '~utils/token-storage';

const MeScreen = ({ navigation }: MeScreenNavigationProps) => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const logout = async () => {
    unAuthenticate();
    removeAccessToken();
    await GoogleSignin.signOut();
  };

  const handleNavigateToMyOrders = (tab: OrderTab) => {
    navigation.navigate('MyOrdersScreen', { tab });
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Button size='lg' variant='destructive' onPress={logout}>
        <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>Logout</Text>
      </Button>

      <View className='gap-[8px] mt-[8px]'>
        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderTab.Pay)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to pay)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderTab.Ship)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to ship)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderTab.Receive)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to receive)</Text>
        </Button>

        <Button size='lg' onPress={() => handleNavigateToMyOrders(OrderTab.Rate)}>
          <Text className='font-inter-medium text-background text-[16px] leading-[20px]'>My Orders (to rate)</Text>
        </Button>
      </View>
    </View>
  );
};

export default MeScreen;
