import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '~screens/HomeScreen';
import MeScreen from '~screens/MeScreen';
import StoresScreen from '~screens/StoresScreen';
import { BottomTabParamList } from '~types/navigation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen name='HomeScreen' component={HomeScreen} />
    <BottomTab.Screen name='StoresScreen' component={StoresScreen} />
    <BottomTab.Screen name='MeScreen' component={MeScreen} />
  </BottomTab.Navigator>
);

export default BottomTabNavigator;
