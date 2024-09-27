import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import CartScreen from '~screens/CartScreen';
import { MainStackParamList } from '~types/navigation';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name='BottomTabStack' component={BottomTabNavigator} options={{ headerShown: false }} />
    <MainStack.Screen name='ProductDetailStack' component={ProductDetailNavigator} options={{ headerShown: false }} />
    <MainStack.Screen
      name='CartScreen'
      component={CartScreen}
      options={{
        title: 'Your cart',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-ExtraBold',
          fontSize: 18,
        },
      }}
    />
  </MainStack.Navigator>
);

export default MainNavigator;
