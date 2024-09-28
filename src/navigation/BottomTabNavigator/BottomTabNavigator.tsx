import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft, CircleUser, Store } from '~components/icons';
import House from '~components/icons/House';
import MeScreen from '~screens/MeScreen';
import StoresScreen from '~screens/StoresScreen';
import { BottomTabParamList, StoresScreenNavigationProps } from '~types/navigation';

import HomeStack from './stack/HomeStackScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => (
  <BottomTab.Navigator
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
        headerShown: false,
      }}
    />
    <BottomTab.Screen
      name='StoresScreen'
      component={StoresScreen}
      options={({ navigation }: StoresScreenNavigationProps) => ({
        tabBarStyle: {
          display: 'none',
        },
        tabBarLabel: 'Stores',
        tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
      })}
    />
    <BottomTab.Screen
      name='MeScreen'
      component={MeScreen}
      options={{
        tabBarStyle: {
          display: 'none',
        },
        tabBarLabel: 'Me',
        tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
      }}
    />
  </BottomTab.Navigator>
);

export default BottomTabNavigator;
