import { ScrollView } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Carousel from '~components/customs/Carousel';
import ProductCard from '~components/customs/ProductCard';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { HomeScreenNavigationProps } from '~types/navigation';
import { removeAccessToken } from '~utils/token-storage';

const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const unAuthenticate = useStore(useShallow((state) => state.unAuthenticate));

  const goToProductDetail = () => {
    navigation.navigate('ProductDetailStack', {
      screen: 'ProductDetailScreen',
      params: { id: '1' },
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
      <Button className='mt-[4px]' onPress={() => goToProductDetail()}>
        <Text>Product Detail</Text>
      </Button>
      <Carousel />
      <ProductCard
        {...{
          id: '1',
          imageUrl:
            'https://megatoys.vn/thumb_1000_1000_2/data/images/products/2022/06/10/cb70c3ee7716ec96598c129232ec4526_1654828014.jpg',
          numOfReviews: 10,
          price: 1500000,
          rating: 4.3,
          title: 'TMA-2 HD Wireless',
        }}
      />
    </ScrollView>
  );
};

export default HomeScreen;
