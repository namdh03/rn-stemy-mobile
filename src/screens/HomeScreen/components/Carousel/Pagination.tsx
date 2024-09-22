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
            className='w-[8px] h-[8px] rounded-[24px] '
            style={{ backgroundColor: paginationIndex === index ? '#FFF1F2' : 'rgba(31, 32, 36, 0.3)' }}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
