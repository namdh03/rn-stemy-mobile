import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import CartScreen from '~screens/CartScreen';
import CheckoutScreen from '~screens/CheckoutScreen';
import { CartScreenNavigationProps, CheckoutScreenNavigationProps, MainStackParamList } from '~types/navigation.type';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name='BottomTabStack' component={BottomTabNavigator} options={{ headerShown: false }} />
    <MainStack.Screen name='ProductDetailStack' component={ProductDetailNavigator} options={{ headerShown: false }} />
    <MainStack.Screen
      name='CartScreen'
      component={CartScreen}
      options={({ navigation }: CartScreenNavigationProps) => ({
        title: 'Your cart',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-ExtraBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='CheckoutScreen'
      component={CheckoutScreen}
      options={({ navigation }: CheckoutScreenNavigationProps) => ({
        title: 'Checkout',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-ExtraBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
      })}
    />
  </MainStack.Navigator>
);

export default MainNavigator;
