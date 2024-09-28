import { ScrollView, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

import images from '~assets/images';
import Banner from '~components/customs/Banner';
import Carousel from '~components/customs/Carousel';
import Category from '~components/customs/Category';
import ProductCard from '~components/customs/ProductCard';
import Bot from '~components/icons/Bot';
import CircleX from '~components/icons/CircleX';
import Laptop from '~components/icons/Laptop';
import SlidersVertical from '~components/icons/SlidersVertical';
import Wrench from '~components/icons/Wrench';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { HomeScreenScreenNavigationProps } from '~types/navigation';
import { removeAccessToken } from '~utils/token-storage';

const HomeScreen = ({ navigation }: HomeScreenScreenNavigationProps) => {
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

  const handlePress = () => {
    navigation.navigate('BottomTabStack', {
      screen: 'StoresScreen',
    });
  };

  const renderCategory = (type: string, name: string) => {
    switch (true) {
      case type === 'Toy' && name === 'Robot':
        return <Category id={1} title='Robot' bgColor='#E4F3EA' icon={Bot} colorIcon='#009B77' />;
      case type === 'Toy' && name === 'Programming':
        return <Category id={2} title='Programming' bgColor='#FFECE8' icon={Laptop} colorIcon='#F88D3F' />;
      case type === 'Toy' && name === 'Module':
        return <Category id={3} title='Module' bgColor='#FFF6E4' icon={SlidersVertical} colorIcon='#FFD233' />;
      case type === 'Toy' && name === 'Accessory':
        return <Category id={4} title='Accessory' bgColor='#F1EDFC' icon={Wrench} colorIcon='#9B81E5' />;
      default:
        return <Category id={0} title='Not found' bgColor='#fecaca' icon={CircleX} colorIcon='#dc2626' />;
    }
  };
  return (
    <ScrollView className='p-[25px]'>
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

      <Banner imageUrl={images.bannerA} onPress={handlePress} />

      <Text className='mt-[17px] font-inter-medium text-[16px] color-foreground leading-[25px] tracking-[0.061px]'>
        Categories
      </Text>
      <View className='flex-row inline-flex items-center justify-between pt-[15px]'>
        {renderCategory('Toy', 'Robot')}
        {renderCategory('Toy', 'Programming')}
        {renderCategory('Toy', 'Module')}
        {renderCategory('Toy', 'Accessory')}
      </View>

      <Banner imageUrl={images.bannerB} onPress={handlePress} />
    </ScrollView>
  );
};

export default HomeScreen;
