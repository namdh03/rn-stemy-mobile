import { FlatList, Image, View } from 'react-native';

import images from '~assets/images';

const Carousel = () => {
  const data = [
    { id: '1', imageUrl: images.robot1 },
    { id: '2', imageUrl: images.robot2 },
    { id: '3', imageUrl: images.robot3 },
    { id: '4', imageUrl: images.robot4 },
  ];
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={item.imageUrl} resizeMode='stretch' className='w-[300px] h-[158px] rounded-[10px]' />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        className='inline-flex mb-[27px] mt-[17px]'
      />
    </View>
  );
};

export default Carousel;
