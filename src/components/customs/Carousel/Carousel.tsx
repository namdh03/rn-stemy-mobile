import { FlatList, Image, View } from 'react-native';

import images from '~assets/images';

const Carousel = () => {
  const data = [
    { id: '1', imageUrl: images.carousel1 },
    { id: '2', imageUrl: images.carousel1 },
  ];
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Image source={item.imageUrl} className='w-[315px] h-[158px] rounded-[10px]' />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        className='inline-flex mb-[30px]'
      />
    </View>
  );
};

export default Carousel;
