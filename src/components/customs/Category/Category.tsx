import React from 'react';
import { Image, View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';

interface CateProps {
  icon: any;
  title: string;
  bgColor: string;
}

const Category = ({ icon, title, bgColor }: CateProps) => {
  return (
    <View className='flex justify-center items-center gap-[10px]'>
      <Button className='w-[48px] h-[48px] p-[8px] rounded-[10px]' style={{ backgroundColor: bgColor }}>
        <Image source={icon} className='w-[24px] h-[24px]' />
      </Button>
      <Text className='font-inter-regular text-[14px] leading-[20px] text-foreground text-center'>{title}</Text>
    </View>
  );
};

export default Category;
