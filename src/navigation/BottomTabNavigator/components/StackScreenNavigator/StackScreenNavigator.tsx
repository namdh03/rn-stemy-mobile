import React from 'react';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BottomTabParamList, MainStackParamList, RootStackParamList } from '~types/navigation.type';

type CustomStackScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParamList, T>,
  CompositeScreenProps<NativeStackScreenProps<MainStackParamList>, NativeStackScreenProps<RootStackParamList>>
>;

type StackScreenNavigatorProps<T extends keyof BottomTabParamList> = {
  Screen: React.ComponentType<CustomStackScreenProps<T>>;
  name: T;
  headerLeft?: (navigation: CustomStackScreenProps<T>['navigation']) => React.ReactNode;
  headerRight?: (navigation: CustomStackScreenProps<T>['navigation']) => React.ReactNode;
  headerTitle?: string | (() => React.ReactNode);
  options?: Omit<NativeStackNavigationOptions, 'headerLeft' | 'headerRight' | 'headerTitle'>;
};

const Stack = createNativeStackNavigator<BottomTabParamList>();

export default function StackScreenNavigator<T extends keyof BottomTabParamList>({
  Screen,
  name,
  headerLeft,
  headerRight,
  headerTitle,
  options = {},
}: StackScreenNavigatorProps<T>) {
  return (
    <Stack.Navigator screenOptions={{ title: '' }}>
      <Stack.Screen
        name={name}
        component={Screen}
        options={({ navigation }) => ({
          ...options,
          headerLeft: headerLeft ? () => headerLeft(navigation) : undefined,
          headerRight: headerRight ? () => headerRight(navigation) : undefined,
          headerTitle: headerTitle,
        })}
      />
    </Stack.Navigator>
  );
}
