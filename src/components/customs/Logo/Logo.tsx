import { Image } from 'react-native';

import images from '~assets/images';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return <Image source={images.logo} className={`w-[109px] h-[109px] ${className}`} />;
};

export default Logo;
