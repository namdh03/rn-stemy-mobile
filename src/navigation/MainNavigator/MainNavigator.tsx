import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import { Text } from '~components/ui/text';
import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import CartScreen from '~screens/CartScreen';
import CheckoutScreen from '~screens/CheckoutScreen';
import CheckoutUserInformationScreen from '~screens/CheckoutUserInformationScreen';
import CreateTicketScreen from '~screens/CreateTicketScreen';
import FeedbackProductScreen from '~screens/FeedbackProductScreen/FeedbackProductScreen';
import MyOrdersScreen from '~screens/MyOrdersScreen';
import MyPurchasesScreen from '~screens/MyPurchasesScreen';
import MyTicketsScreen from '~screens/MyTicketsScreen';
import OrderDetailScreen from '~screens/OrderDetailScreen';
import OrderErrorScreen from '~screens/OrderErrorScreen';
import OrderHistoryScreen from '~screens/OrderHistoryScreen';
import OrderProgressScreen from '~screens/OrderProgressScreen';
import OrderSuccessScreen from '~screens/OrderSuccessScreen';
import SearchMyPurchasesScreen from '~screens/SearchMyPurchasesScreen';
import SearchOrdersScreen from '~screens/SearchOrdersScreen';
import SearchProductScreen from '~screens/SearchProductScreen';
import SettingsScreen from '~screens/SettingsScreen';
import TicketDetailScreen from '~screens/TicketDetailScreen';
import {
  CartScreenNavigationProps,
  CheckoutScreenNavigationProps,
  CheckoutUserInformationScreenNavigationProps,
  CreateTicketScreenNavigationProps,
  FeedbackProductScreenNavigationProps,
  MainStackParamList,
  MyOrdersScreenNavigationProps,
  MyPurchasesScreenNavigationProps,
  MyTicketsScreenNavigationProps,
  OrderDetailScreenNavigationProps,
  OrderHistoryScreenNavigationProps,
  SearchMyPurchasesScreenNavigationProps,
  SearchOrdersScreenNavigationProps,
  SearchProductScreenNavigationProps,
  SettingsScreenNavigationProps,
  TicketDetailScreenNavigationProps,
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
          fontFamily: 'Inter_18pt-SemiBold',
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
          fontFamily: 'Inter_18pt-SemiBold',
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
          fontFamily: 'Inter_18pt-SemiBold',
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
    <MainStack.Screen
      name='SearchProductScreen'
      component={SearchProductScreen}
      options={({ navigation }: SearchProductScreenNavigationProps) => ({
        title: 'Search',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='MyOrdersScreen'
      component={MyOrdersScreen}
      options={({ navigation }: MyOrdersScreenNavigationProps) => ({
        title: 'My orders',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='SearchOrdersScreen'
      component={SearchOrdersScreen}
      options={({ navigation }: SearchOrdersScreenNavigationProps) => ({
        title: 'Search order',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='OrderDetailScreen'
      component={OrderDetailScreen}
      options={({ navigation }: OrderDetailScreenNavigationProps) => ({
        title: 'Order detail',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='OrderHistoryScreen'
      component={OrderHistoryScreen}
      options={({ navigation }: OrderHistoryScreenNavigationProps) => ({
        title: 'My orders history',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='FeedbackProductScreen'
      component={FeedbackProductScreen}
      options={({ navigation }: FeedbackProductScreenNavigationProps) => ({
        title: 'Rate product',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => console.log('FEEDBACK_SUBMIT')}>
            <Text className='font-inter-medium text-primary text-[18px]'>Submit</Text>
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='MyPurchasesScreen'
      component={MyPurchasesScreen}
      options={({ navigation }: MyPurchasesScreenNavigationProps) => ({
        title: 'My Purchases',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-Medium',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='SettingsScreen'
      component={SettingsScreen}
      options={({ navigation }: SettingsScreenNavigationProps) => ({
        title: 'Settings',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-Medium',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='MyTicketsScreen'
      component={MyTicketsScreen}
      options={({ navigation }: MyTicketsScreenNavigationProps) => ({
        title: 'My tickets',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-Medium',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
      })}
    />
    <MainStack.Screen
      name='SearchMyPurchasesScreen'
      component={SearchMyPurchasesScreen}
      options={({ navigation }: SearchMyPurchasesScreenNavigationProps) => ({
        title: 'Search my purchases',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='TicketDetailScreen'
      component={TicketDetailScreen}
      options={({ navigation }: TicketDetailScreenNavigationProps) => ({
        title: 'Ticket detail',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
      name='CreateTicketScreen'
      component={CreateTicketScreen}
      options={({ navigation }: CreateTicketScreenNavigationProps) => ({
        title: 'Create ticket',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
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
