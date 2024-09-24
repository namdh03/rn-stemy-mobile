import { View } from 'react-native';

import Category from '~components/customs/Category';
import Bot from '~components/icons/Bot';
import CircleX from '~components/icons/CircleX';
import Laptop from '~components/icons/Laptop';
import SlidersVertical from '~components/icons/SlidersVertical';
import Wrench from '~components/icons/Wrench';

const HomeScreen = () => {
  const renderCategory = (type: string) => {
    switch (type) {
      case 'robot':
        return <Category id={1} title='Robot' bgColor='#E4F3EA' icon={Bot} colorIcon='#009B77' />;
      case 'programming':
        return <Category id={2} title='Programming' bgColor='#FFECE8' icon={Laptop} colorIcon='#F88D3F' />;
      case 'module':
        return <Category id={3} title='Module' bgColor='#FFF6E4' icon={SlidersVertical} colorIcon='#FFD233' />;
      case 'accessory':
        return <Category id={4} title='Accessory' bgColor='#F1EDFC' icon={Wrench} colorIcon='#9B81E5' />;
      default:
        return <Category id={0} title='Not found' bgColor='#fecaca' icon={CircleX} colorIcon='#dc2626' />;
    }
  };
  return (
    <View>
      {renderCategory('robot')}
      {renderCategory('programming')}
      {renderCategory('module')}
      {renderCategory('accessory')}
      {renderCategory('another')}
    </View>
  );
};

export default HomeScreen;
