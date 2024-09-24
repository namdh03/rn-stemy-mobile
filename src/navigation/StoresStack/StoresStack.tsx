import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft, ShoppingCart } from '~components/icons';
import ProductDetailScreen from '~screens/ProductDetailScreen';
import ProductListScreen from '~screens/ProductListScreen';
import { ProductDetailScreenNavigationProps, StoresStackParamList } from '~types/navigation';

const StoresStackNavigator = createNativeStackNavigator<StoresStackParamList>();

export default function StoresStack() {
  return (
    <StoresStackNavigator.Navigator>
      <StoresStackNavigator.Screen name='ProductListScreen' component={ProductListScreen} />
      <StoresStackNavigator.Screen
        name='ProductDetailScreen'
        component={ProductDetailScreen}
        options={({ navigation }: ProductDetailScreenNavigationProps) => ({
          headerTitle: 'Detail Product',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Inter_18pt-Medium',
            fontSize: 16,
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-foreground' size={26} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <ShoppingCart className='text-foreground' size={24} />
            </Pressable>
          ),
        })}
      />
    </StoresStackNavigator.Navigator>
  );
}
