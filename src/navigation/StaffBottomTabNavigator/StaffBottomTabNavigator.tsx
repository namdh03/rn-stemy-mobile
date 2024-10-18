import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CircleUser, Tickets } from '~components/icons';
import { StaffBottomTabParamList } from '~types/navigation.type';

import StaffProfileStack from './stack/StaffProfileStack';
import SupportStack from './stack/SupportStack';

const StaffBottomTab = createBottomTabNavigator<StaffBottomTabParamList>();

const StaffBottomTabNavigator = () => {
  return (
    <StaffBottomTab.Navigator
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
      <StaffBottomTab.Screen
        name='SupportStack'
        component={SupportStack}
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({ color, size }) => <Tickets color={color} size={size} />,
        }}
      />
      <StaffBottomTab.Screen
        name='StaffProfileStack'
        component={StaffProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
        }}
      />
    </StaffBottomTab.Navigator>
  );
};

export default StaffBottomTabNavigator;
