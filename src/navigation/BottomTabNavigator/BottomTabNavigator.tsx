import { Drawer } from 'react-native-drawer-layout';
import { useShallow } from 'zustand/react/shallow';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CircleUser, Store } from '~components/icons';
import House from '~components/icons/House';
import DrawerFilterSortingContent from '~navigation/BottomTabNavigator/components/DrawerFilterSortingContent';
import { useStore } from '~store';
import { BottomTabParamList } from '~types/navigation.type';

import HomeStack from './stack/HomeStack';
import MeStack from './stack/MeStack';
import StoresStack from './stack/StoresStack';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const { openStoresDrawer, onStoresDrawerOpen, onStoresDrawerClose, resetFilterSorting } = useStore(
    useShallow((state) => ({
      openStoresDrawer: state.openStoresDrawer,
      onStoresDrawerOpen: state.onStoresDrawerOpen,
      onStoresDrawerClose: state.onStoresDrawerClose,
      resetFilterSorting: state.resetFilterSorting,
    })),
  );

  return (
    <Drawer
      open={openStoresDrawer}
      onOpen={onStoresDrawerOpen}
      onClose={onStoresDrawerClose}
      renderDrawerContent={() => {
        return <DrawerFilterSortingContent />;
      }}
      drawerPosition='right'
    >
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
          listeners={() => ({
            tabPress: resetFilterSorting,
          })}
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
          listeners={() => ({
            tabPress: resetFilterSorting,
          })}
        />
      </BottomTab.Navigator>
    </Drawer>
  );
};

export default BottomTabNavigator;
