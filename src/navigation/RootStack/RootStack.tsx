import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import RootDrawer from '~navigation/RootDrawer';
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
import { RootStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name='RootDrawer' component={RootDrawer} options={{ headerShown: false }} />
      <Stack.Screen name='CartScreen' component={CartScreen} options={{ title: 'Your cart' }} />
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{ title: 'Checkout' }} />
      <Stack.Screen
        name='CheckoutUserInformationScreen'
        component={CheckoutUserInformationScreen}
        options={{ title: 'Checkout' }}
      />
      <Stack.Screen name='OrderProgressScreen' component={OrderProgressScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='OrderSuccessScreen'
        component={OrderSuccessScreen}
        options={() => ({
          title: '',
          headerLeft: () => <MainHeaderLeft />,
          headerRight: () => <MainHeaderRight />,
          headerLeftContainerStyle: { paddingLeft: 24 },
          headerRightContainerStyle: { paddingRight: 24 },
        })}
      />
      <Stack.Screen
        name='OrderErrorScreen'
        component={OrderErrorScreen}
        options={() => ({
          title: '',
          headerLeft: () => <MainHeaderLeft />,
          headerRight: () => <MainHeaderRight />,
          headerLeftContainerStyle: { paddingLeft: 24 },
          headerRightContainerStyle: { paddingRight: 24 },
        })}
      />
      <Stack.Screen name='SearchProductScreen' component={SearchProductScreen} options={{ title: 'Search' }} />
      <Stack.Screen name='MyOrdersScreen' component={MyOrdersScreen} options={{ title: 'My orders' }} />
      <Stack.Screen name='SearchOrdersScreen' component={SearchOrdersScreen} options={{ title: 'Search order' }} />
      <Stack.Screen name='OrderDetailScreen' component={OrderDetailScreen} options={{ title: 'Order detail' }} />
      <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} options={{ title: 'My orders history' }} />
      <Stack.Screen
        name='FeedbackProductScreen'
        component={FeedbackProductScreen}
        options={{ title: 'Rate product' }}
      />
      <Stack.Screen name='MyPurchasesScreen' component={MyPurchasesScreen} options={{ title: 'My Purchases' }} />
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name='MyTicketsScreen' component={MyTicketsScreen} options={{ title: 'My tickets' }} />
      <Stack.Screen
        name='SearchMyPurchasesScreen'
        component={SearchMyPurchasesScreen}
        options={{ title: 'Search my purchases' }}
      />
      <Stack.Screen name='TicketDetailScreen' component={TicketDetailScreen} options={{ title: 'Ticket detail' }} />
      <Stack.Screen name='CreateTicketScreen' component={CreateTicketScreen} options={{ title: 'Create ticket' }} />
    </Stack.Navigator>
  );
};

export default RootStack;
