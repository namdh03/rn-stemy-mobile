import React from 'react';
import { FlatList, Image } from 'react-native';

import images from '~assets/images';
import { Card, CardContent, CardFooter } from '~components/ui/card';
import { Text } from '~components/ui/text';

// interface CardProductProps {
//   imageUrl: string;
//   title: string;
//   minPrice: number;
//   maxPrice: number;
// }

const CardProduct = () => {
  const productList = [
    {
      id: '1',
      imageUrl: images.product,
      title: 'Robot STEM Rover version 2',
      minPrice: 950000,
      maxPrice: 1850000,
    },
    {
      id: '2',
      imageUrl: images.product,
      title: 'Robot STEM Rover version 2',
      minPrice: 950000,
      maxPrice: 1850000,
    },
    {
      id: '3',
      imageUrl: images.product,
      title: 'Robot STEM Rover version 2',
      minPrice: 950000,
      maxPrice: 1850000,
    },
  ];
  return (
    <FlatList
      data={productList}
      renderItem={({ item }) => (
        <Card className='flex-1 mr-[12px] w-[200px] h-[189px] max-w-sm rounded-[16px] items-start overflow-hidden'>
          <CardContent className='flex-1 w-[200px] justify-center items-center'>
            <Image source={item.imageUrl} className='object-contain w-[200px] h-[120px] ' />
          </CardContent>
          <CardFooter className='flex pl-[16px] flex-col items-start gap-[16px] self-stretch'>
            <Text className='font-inter-regular text-[12px] leading-[16px] color-foreground'>{item.title}</Text>
            <Text className='font-inter-extraBold text-[14px] color-foreground'>
              {item.minPrice.toLocaleString()} - {item.maxPrice.toLocaleString()} đ
            </Text>
          </CardFooter>
        </Card>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CardProduct;
