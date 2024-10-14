import { useRef } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { ShoppingCart } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Text } from '~components/ui/text';
import { GET_CART_COUNT_QUERY_KEY } from '~constants/cart-query-key';
import execute from '~graphql/execute';
import { GetCartCountQuery } from '~services/cart.services';
import { MainStackParamList } from '~types/navigation.type';

import Pressable from '../Pressable';

const MainHeaderRight = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { data } = useQuery({
    queryKey: [GET_CART_COUNT_QUERY_KEY],
    queryFn: () => execute(GetCartCountQuery),
    select: (data) => data.data.countCart,
  });

  const cartIconRef = useRef<View>(null);

  return (
    <View className='flex-row gap-[18px]'>
      {/* <Pressable>
        <Bell className='text-foreground' size={26} />
      </Pressable> */}
      <Pressable onPress={() => navigation.navigate('CartScreen')}>
        <View ref={cartIconRef}>
          <ShoppingCart className='text-foreground' size={26} />
        </View>
        <Badge
          pointerEvents='none'
          className='absolute top-[-3px] right-[-8px] items-center justify-center p-0 w-[20px] h-[20px]'
          variant='destructive'
        >
          <Text>{data || 0}</Text>
        </Badge>
      </Pressable>
    </View>
  );
};

export default MainHeaderRight;
