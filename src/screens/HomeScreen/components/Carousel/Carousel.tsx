import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, View, ViewToken } from 'react-native';

import images from '~assets/images';

import Pagination from './Pagination';

const { width } = Dimensions.get('screen');
const Carousel = () => {
  const [paginationIndex, setPaginationIndex] = useState(0);

  const imageList = [
    {
      id: '1',
      imageUrl: images.image1,
    },
    {
      id: '2',
      imageUrl: images.image2,
    },
    {
      id: '3',
      imageUrl: images.image3,
    },
  ];

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== undefined && viewableItems[0].index !== null) {
      setPaginationIndex(viewableItems[0].index);
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);
  return (
    <View className='relative'>
      <FlatList
        data={imageList}
        renderItem={({ item }) => (
          <View style={{ width }} className='w-full justify-center items-center '>
            <Image source={item.imageUrl} className='w-[375px] h-[214px] items-center justify-center' />
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <View className='absolute bottom-0 left-0 right-0 '>
        <Pagination items={imageList} paginationIndex={paginationIndex} />
      </View>
    </View>
  );
};

export default Carousel;
