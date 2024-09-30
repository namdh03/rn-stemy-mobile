import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logo from '~components/customs/Logo';
import Pressable from '~components/customs/Pressable';
import { Bell, ChevronLeft, ShoppingCart } from '~components/icons';
import { Text } from '~components/ui/text';
import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import CartScreen from '~screens/CartScreen';
import CheckoutScreen from '~screens/CheckoutScreen';
import OrderProgressScreen from '~screens/OrderProgressScreen';
import OrderSuccessScreen from '~screens/OrderSuccessScreen';
import PhoneAndAddressScreen from '~screens/PhoneAndAddressScreen';
import {
  CartScreenNavigationProps,
  CheckoutScreenNavigationProps,
  MainStackParamList,
  OrderSuccessScreenNavigationProps,
  PhoneAndAddressScreenNavigationProps,
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
      name='PhoneAndAddressScreen'
      component={PhoneAndAddressScreen}
      options={({ navigation }: PhoneAndAddressScreenNavigationProps) => ({
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
    <MainStack.Screen
      name='OrderSuccessScreen'
      component={OrderSuccessScreen}
      options={({ navigation }: OrderSuccessScreenNavigationProps) => ({
        title: '',
        headerLeft: () => (
          <View className='flex-row gap-[16px] items-center'>
            <Logo className='w-[33px] h-[33px]' />
            <Text className='font-jaro-regular mt-[4px] text-foreground text-center text-[22px] leading-[44.8px]'>
              STEMY
            </Text>
          </View>
        ),
        headerRight: () => (
          <View className='flex-row gap-[20px]'>
            <Pressable>
              <Bell className='text-foreground' size={26} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('CartScreen')}>
              <ShoppingCart className='text-foreground' size={26} />
            </Pressable>
          </View>
        ),
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
        headerRightContainerStyle: {
          paddingRight: 24,
        },
      })}
    />
    <MainStack.Screen name='OrderProgressScreen' component={OrderProgressScreen} options={{ headerShown: false }} />
  </MainStack.Navigator>
);

export default MainNavigator;
