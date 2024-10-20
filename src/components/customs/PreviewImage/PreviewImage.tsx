import { Dimensions, Modal, Pressable, View } from 'react-native';
import { Image } from 'expo-image';

import { X } from '~components/icons';

interface PreviewImageProps {
  image: string | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PreviewImage = ({ image, visible, setVisible }: PreviewImageProps) => {
  return (
    <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 12,
            width: SCREEN_WIDTH * 0.85,
            maxHeight: SCREEN_HEIGHT * 0.75,
          }}
        >
          <Pressable
            onPress={() => setVisible(false)}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 10,
              padding: 5,
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 20,
            }}
          >
            <X size={24} className='text-foreground' />
          </Pressable>
          {image && (
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={image}
                style={{
                  width: SCREEN_WIDTH * 0.75,
                  height: SCREEN_HEIGHT * 0.5,
                  borderRadius: 8,
                }}
                contentFit='contain'
                transition={1000}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PreviewImage;
