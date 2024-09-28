import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logo from '~components/customs/Logo';
import Pressable from '~components/customs/Pressable';
import { Bell, ShoppingCart } from '~components/icons';
import { Text } from '~components/ui/text';
import HomeScreen from '~screens/HomeScreen';
import { HomeScreenScreenNavigationProps, HomeStackParamList } from '~types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ title: '' }}>
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={({ navigation }: HomeScreenScreenNavigationProps) => ({
          headerLeft: () => (
            <View className='flex-row gap-[16px] items-center'>
              <Logo className='w-[33px] h-[33px]' />
              <Text className='font-jaro-regular mt-[4px] text-foreground text-center text-[22px] leading-[44.8px]'>
                STEMY
              </Text>
            </View>
          ),
          headerRight: () => (
            <View className='flex-row gap-[20px]'>
              <Pressable>
                <Bell className='text-foreground' size={28} />
              </Pressable>
              <Pressable onPress={() => navigation.navigate('CartScreen')}>
                <ShoppingCart className='text-foreground' size={28} />
              </Pressable>
            </View>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 24,
          },
          headerRightContainerStyle: {
            paddingRight: 24,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
