import { memo } from 'react';
import { View } from 'react-native';

const MarkerSlider = () => {
  return (
    <View
      pointerEvents='none'
      style={{ marginHorizontal: 6 }}
      className='w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center'
    >
      <View className='w-[12px] h-[12px] bg-background rounded-full'></View>
    </View>
  );
};

export default memo(MarkerSlider);
