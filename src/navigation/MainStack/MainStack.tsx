import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StoresStack from '~navigation/StoresStack';
import HomeScreen from '~screens/HomeScreen';
import { BottomTabParamList } from '~types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainStack() {
  return (
    <Tab.Navigator detachInactiveScreens={false}>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='StoresStack' component={StoresStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
