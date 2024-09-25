import { Image, TouchableOpacity, View } from 'react-native';

import images from '~assets/images';

interface BannerProps {
  onPress: () => void;
}

const Banner = ({ onPress }: BannerProps) => {
  return (
    <TouchableOpacity className='pb-[20px] pt-[41px]' onPress={onPress}>
      <View className='w-[325px] h-[150px]'>
        <Image source={images.banner1} />
      </View>
    </TouchableOpacity>
  );
};

export default Banner;
