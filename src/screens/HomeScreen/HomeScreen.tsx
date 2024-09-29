import { ScrollView, View } from 'react-native';

import images from '~assets/images';
import Banner from '~components/customs/Banner';
import Carousel from '~components/customs/Carousel';
import Category from '~components/customs/Category';
import SearchName from '~components/customs/SearchName';
import { Bot, CircleX, Laptop, SlidersVertical, Wrench } from '~components/icons';
import { Text } from '~components/ui/text';
import { HomeScreenNavigationProps } from '~types/navigation.type';
// import { removeAccessToken } from '~utils/token-storage';

const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
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
    <ScrollView className='px-[25px]'>
      <SearchName />
      <Carousel />

      <View className='mb-[50px]'>
        <Text className='mt-[17px] font-inter-medium text-[16px] color-foreground leading-[25px] tracking-[0.061px]'>
          Categories
        </Text>
        <View className='flex-row inline-flex items-center justify-between pt-[15px]'>
          {renderCategory('Toy', 'Robot')}
          {renderCategory('Toy', 'Programming')}
          {renderCategory('Toy', 'Module')}
          {renderCategory('Toy', 'Accessory')}
        </View>
      </View>

      <Banner imageUrl={images.bannerA} onPress={handlePress} />

      <Banner imageUrl={images.bannerB} onPress={handlePress} />
    </ScrollView>
  );
};

export default HomeScreen;
