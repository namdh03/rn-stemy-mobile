import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabNavigator from '~navigation/BottomTabNavigator';
import ProductDetailNavigator from '~navigation/ProductDetailNavigator';
import { MainStackParamList } from '~types/navigation';

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name='BottomTabStack' component={BottomTabNavigator} options={{ headerShown: false }} />
    <MainStack.Screen name='ProductDetailStack' component={ProductDetailNavigator} options={{ headerShown: false }} />
  </MainStack.Navigator>
);

export default MainNavigator;
