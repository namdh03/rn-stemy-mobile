import { ScrollView } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Carousel from '~components/customs/Carousel';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { HomeScreenNavigationProps } from '~types/navigation';
import { removeAccessToken } from '~utils/token-storage';

const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const goToProductDetail = (productId: number) => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: { id: productId },
    });
  };

  const logout = async () => {
    unAuthenticate();
    removeAccessToken();
    await GoogleSignin.signOut();
  };

  return (
    <ScrollView className='px-[25px]'>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
      <Button className='mt-[4px]' onPress={() => goToProductDetail(1)}>
        <Text>Product Detail</Text>
      </Button>
      <Carousel />
    </ScrollView>
  );
};

export default HomeScreen;
