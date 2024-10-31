import { useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { ShoppingCart } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Text } from '~components/ui/text';
import { GET_CART_COUNT_QUERY_KEY } from '~constants/cart-query-key';
import execute from '~graphql/execute';
import { GetCartCountQuery } from '~services/cart.services';
import { RootStackParamList } from '~types/navigation.type';

const MainHeaderRight = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data } = useQuery({
    queryKey: [GET_CART_COUNT_QUERY_KEY],
    queryFn: () => execute(GetCartCountQuery),
    select: (data) => data.data.countCart,
  });

  const cartIconRef = useRef<View>(null);

  return (
    <View className='flex-shrink-0'>
      {/* <Pressable>
        <Bell className='text-foreground' size={26} />
      </Pressable> */}
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <View ref={cartIconRef}>
          <ShoppingCart className='text-foreground' size={26} />
        </View>
        <Badge
          pointerEvents='none'
          className='absolute top-[-12px] right-[-8px] items-center justify-center p-0 w-[20px] h-[20px]'
          variant='destructive'
        >
          <Text>{data || 0}</Text>
        </Badge>
      </TouchableOpacity>
    </View>
  );
};

export default MainHeaderRight;
