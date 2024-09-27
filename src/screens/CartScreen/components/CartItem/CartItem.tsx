import { View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useShallow } from 'zustand/react/shallow';

import { Checkbox } from '~components/ui/checkbox';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { GetCartQuery } from '~graphql/graphql';
import { useStore } from '~store';

interface CartItemProps {
  item: GetCartQuery['carts'][number];
}

const CartItem = ({ item }: CartItemProps) => {
  const { selectedCart, setSelectedCart } = useStore(
    useShallow((state) => ({
      selectedCart: state.selectedCart,
      setSelectedCart: state.setSelectedCart,
    })),
  );

  const handleSelectedChange = () => setSelectedCart(item);

  return (
    <Swipeable>
      <View className='flex-row items-center'>
        <Checkbox
          checked={selectedCart ? item.id in selectedCart : false}
          onCheckedChange={handleSelectedChange}
          className='mr-[12px]'
        />
        <Image
          source={item.product.images[0].url}
          placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
          style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 4 }}
          contentFit='cover'
        />
        <View className='ml-[16px]'>
          <Text className='font-inter-bold text-foreground text-[14px]'>Amazing T-shirt</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItem;
