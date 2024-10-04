import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CircleUser, Store } from '~components/icons';
import House from '~components/icons/House';
import { BottomTabParamList } from '~types/navigation.type';

import HomeStack from './stack/HomeStack';
import MeStack from './stack/MeStack';
import StoresStack from './stack/StoresStack';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
  <BottomTab.Navigator
    backBehavior='history'
    detachInactiveScreens={false}
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingTop: 8,
        paddingBottom: 8,
        height: 60,
      },
      tabBarLabelStyle: {
        fontFamily: 'Inter_18pt-SemiBold',
        fontSize: 12,
        backgroundColor: 'white',
      },
      tabBarActiveTintColor: '#16A34A',
      tabBarInactiveTintColor: '#71717A',
    }}
  >
    <BottomTab.Screen
      name='HomeStack'
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
      }}
    />
    <BottomTab.Screen
      name='StoresStack'
      component={StoresStack}
      options={{
        tabBarLabel: 'Stores',
        tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
      }}
    />
    <BottomTab.Screen
      name='MeStack'
      component={MeStack}
      options={{
        tabBarLabel: 'Me',
        tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
      }}
    />
  </BottomTab.Navigator>
);

export default BottomTabNavigator;
