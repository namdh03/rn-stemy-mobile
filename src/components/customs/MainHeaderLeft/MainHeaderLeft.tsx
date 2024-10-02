import { View } from 'react-native';

import { Text } from '~components/ui/text';

import Logo from '../Logo';

const MainHeaderLeft = () => {
  return (
    <View className='flex-row gap-[16px] items-center'>
      <Logo className='w-[33px] h-[33px]' />
      <Text className='font-jaro-regular mt-[4px] text-foreground text-center text-[22px] leading-[44.8px]'>STEMY</Text>
    </View>
  );
};

export default MainHeaderLeft;
