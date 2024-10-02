import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import CartScreen from '~screens/CartScreen';
import CheckoutScreen from '~screens/CheckoutScreen';
import CheckoutUserInformationScreen from '~screens/CheckoutUserInformationScreen';
import OrderErrorScreen from '~screens/OrderErrorScreen';
import OrderProgressScreen from '~screens/OrderProgressScreen';
import OrderSuccessScreen from '~screens/OrderSuccessScreen';
import {
  CartScreenNavigationProps,
  CheckoutScreenNavigationProps,
  CheckoutUserInformationScreenNavigationProps,
  MainStackParamList,
} from '~types/navigation.type';

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
    <MainStack.Screen
      name='CheckoutUserInformationScreen'
      component={CheckoutUserInformationScreen}
      options={({ navigation }: CheckoutUserInformationScreenNavigationProps) => ({
        title: '',
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
    <MainStack.Screen name='OrderProgressScreen' component={OrderProgressScreen} options={{ headerShown: false }} />
    <MainStack.Screen
      name='OrderSuccessScreen'
      component={OrderSuccessScreen}
      options={() => ({
        title: '',
        headerLeft: () => <MainHeaderLeft />,
        headerRight: () => <MainHeaderRight />,
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
        headerRightContainerStyle: {
          paddingRight: 24,
        },
      })}
    />
    <MainStack.Screen
      name='OrderErrorScreen'
      component={OrderErrorScreen}
      options={() => ({
        title: '',
        headerLeft: () => <MainHeaderLeft />,
        headerRight: () => <MainHeaderRight />,
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
        headerRightContainerStyle: {
          paddingRight: 24,
        },
      })}
    />
  </MainStack.Navigator>
);

export default MainNavigator;
