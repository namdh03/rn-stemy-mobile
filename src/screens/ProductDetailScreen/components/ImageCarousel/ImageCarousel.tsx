import { useState } from 'react';
import { Dimensions, Modal, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';

import Pressable from '~components/customs/Pressable';
import { CircleX } from '~components/icons';
import constants from '~constants';
import { useColorScheme } from '~hooks';

export type ImageType = {
  id: string;
  url: string;
};

interface ImageCarouselProps {
  images: ImageType[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const { isDarkColorScheme } = useColorScheme();
  const { width, height } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const baseOptions = {
    vertical: false,
    width: width,
    height: 280,
  } as const;

  const modalOptions = {
    vertical: false,
    width: width,
    height: height,
  } as const;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        style={{ position: 'relative', zIndex: 1000 }}
        visible={modalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View className='relative flex-1 justify-center items-center bg-black/90'>
          <Pressable onPress={closeModal} className='absolute top-6 right-6 z-10'>
            <CircleX size={32} className={`${isDarkColorScheme ? 'text-muted-foreground' : 'text-muted'}`} />
          </Pressable>

          <Carousel
            {...modalOptions}
            data={images}
            pagingEnabled={true}
            loop
            enabled
            style={{ flex: 1, alignItems: 'center' }}
            defaultIndex={currentIndex}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit='contain'
              />
            )}
          />

          <Text className='absolute bottom-3 left-3 text-muted bg-black/50 px-2 py-1 rounded-md'>
            {`${currentIndex + 1}/${images.length} Photo`}
          </Text>
        </View>
      </Modal>
      <View className='relative w-full h-full'>
        <Carousel
          {...baseOptions}
          loop
          enabled
          style={{ width: '100%' }}
          data={images}
          pagingEnabled={true}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item }) => (
            <Pressable onPress={openModal}>
              <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: item.url }}
                placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                contentFit='cover'
                transition={1000}
              />
            </Pressable>
          )}
        />

        <Text className='absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded-md'>
          {`${currentIndex + 1}/${images.length} Photo`}
        </Text>
      </View>
    </>
  );
}
