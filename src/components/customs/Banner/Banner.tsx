import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

interface BannerProps {
  onPress: () => void;
  imageUrl: ImageSourcePropType | string;
}

const Banner = ({ onPress, imageUrl }: BannerProps) => {
  return (
    <TouchableOpacity onPress={onPress} className='pb-[20px] pt-[41px] px-[25px]'>
      <Image
        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
        resizeMode='cover'
        className='w-full h-[150px] rounded-[10px]'
      />
    </TouchableOpacity>
  );
};

export default Banner;
