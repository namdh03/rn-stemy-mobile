import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import { CircleUser, Tickets, Truck } from '~components/icons';
import DeliveryScreen from '~screens/DeliveryScreen';
import StaffProfileScreen from '~screens/StaffProfileScreen';
import SupportScreen from '~screens/SupportScreen';
import { StaffBottomTabsParamList } from '~types/navigation.type';

const BottomTab = createBottomTabNavigator<StaffBottomTabsParamList>();

const StaffBottomTabs = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { height: 56 },
        tabBarLabelStyle: { fontFamily: 'Inter_18pt-SemiBold', fontSize: 12 },
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#71717A',
        headerTitle: '',
        headerLeft: () => <MainHeaderLeft />,
        headerLeftContainerStyle: { paddingLeft: 24 },
        headerRightContainerStyle: { paddingRight: 24 },
      }}
    >
      <BottomTab.Screen
        name='SupportScreen'
        component={SupportScreen}
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({ color, size }) => <Tickets color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name='DeliveryScreen'
        component={DeliveryScreen}
        options={{
          tabBarLabel: 'Delivery',
          tabBarIcon: ({ color, size }) => <Truck color={color} size={size} />,
        }}
      />
      <BottomTab.Screen
        name='StaffProfileScreen'
        component={StaffProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default StaffBottomTabs;
