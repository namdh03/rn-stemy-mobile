import {  Image, TouchableOpacity, View } from 'react-native';

import images from '~assets/images';

const Banner = () => {
  return (
    <TouchableOpacity className='px-[25px] pb-[20px] pt-[41px]' onPress={onPress}>
      <View className='w-[325px] h-[150px]'>
        <Image source={images.banner1} />
      </View>
    </TouchableOpacity>
  );
};

export default Banner;
