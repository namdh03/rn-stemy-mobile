import { ScrollView, View } from 'react-native';

import { Text } from '~components/ui/text';

import CardProduct from './components/CardProduct';
import Carousel from './components/Carousel';

// interface ProductProps {
//   title: string;
// }

const HomeScreen = () => {
  return (
    <ScrollView className='flex-1'>
      <Carousel />
      <View className='flex-1 mt-[24px] px-[16px] mx-auto w-full max-w-xl '>
        <View className=' flex-row justify-between mb-[16px] '>
          <Text className='font-inter-extraBold color-foreground text-[14px]'>Perfect for you</Text>
          <Text className='font-inter-semiBold text-[12px] color-primary'>See more</Text>
        </View>
        <CardProduct />
      </View>

      <View className='flex-1 mt-[24px] px-[16px] mx-auto w-full max-w-xl '>
        <View className=' flex-row justify-between mb-[16px] '>
          <Text className='font-inter-extraBold color-foreground text-[14px]'>Best seller</Text>
          <Text className='font-inter-semiBold text-[12px] color-primary'>See more</Text>
        </View>
        <CardProduct />
      </View>

      <View className='flex-1 mt-[24px] px-[16px] mx-auto w-full max-w-xl '>
        <View className=' flex-row justify-between mb-[16px] '>
          <Text className='font-inter-extraBold color-foreground text-[14px]'>Best seller</Text>
          <Text className='font-inter-semiBold text-[12px] color-primary'>See more</Text>
        </View>
        <CardProduct />
      </View>

      <View className='flex-1 mt-[24px] px-[16px] mx-auto w-full max-w-xl '>
        <View className=' flex-row justify-between mb-[16px] '>
          <Text className='font-inter-extraBold color-foreground text-[14px]'>Best seller</Text>
          <Text className='font-inter-semiBold text-[12px] color-primary'>See more</Text>
        </View>
        <CardProduct />
      </View>

      <View className='flex-1 mt-[24px] px-[16px] mx-auto w-full max-w-xl '>
        <View className=' flex-row justify-between mb-[16px] '>
          <Text className='font-inter-extraBold color-foreground text-[14px]'>Best seller</Text>
          <Text className='font-inter-semiBold text-[12px] color-primary'>See more</Text>
        </View>
        <CardProduct />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
