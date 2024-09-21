import React from 'react';
import { View } from 'react-native';

type Props = {
  items: Array<{ id: string; imageUrl: string }>;
  paginationIndex: number;
};
const Pagination = ({ items, paginationIndex }: Props) => {
  return (
    <View className='flex-row h-[60px] justify-center items-center gap-[8px]'>
      {items.map((_, index) => {
        return (
          <View
            key={index}
            className='w-[8px] h-[8px] rounded-[24px] opacity-30 '
            style={{ backgroundColor: paginationIndex === index ? '#222' : '#aaa' }}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
