import React from 'react';
import { Dimensions } from 'react-native';
import { View } from 'react-native';
import { Drawer as DrawerLayout } from 'react-native-drawer-layout';
import { useShallow } from 'zustand/react/shallow';

import { createDrawerNavigator, DrawerNavigationProp, DrawerToggleButton } from '@react-navigation/drawer';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import RootBottomTabs from '~navigation/RootBottomTabs';
import ProductDetailScreen from '~screens/ProductDetailScreen';
import { useStore } from '~store';
import { RootDrawerParamList } from '~types/navigation.type';
import getCurrentScreenName from '~utils/getCurrentScreenName';

import DrawerFilterSortingContent from './components/DrawerFilterSortingContent';
import DrawerNavigationContent from './components/DrawerNavigationContent';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const RootDrawer = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { openStoresDrawer, onStoresDrawerOpen, onStoresDrawerClose } = useStore(
    useShallow((state) => ({
      openStoresDrawer: state.openStoresDrawer,
      onStoresDrawerOpen: state.onStoresDrawerOpen,
      onStoresDrawerClose: state.onStoresDrawerClose,
    })),
  );
  const screenWidth = Dimensions.get('window').width;
  const edgeWidth = Math.min(screenWidth * 0.5, 100);
  const currentScreenName = useNavigationState((state) => getCurrentScreenName(state.routes[state.index]));

  return (
    <DrawerLayout
      drawerPosition='right'
      swipeEdgeWidth={currentScreenName === 'StoresScreen' ? edgeWidth : 0}
      swipeEnabled={currentScreenName === 'StoresScreen'}
      open={openStoresDrawer}
      onOpen={onStoresDrawerOpen}
      onClose={onStoresDrawerClose}
      renderDrawerContent={() => <DrawerFilterSortingContent />}
    >
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
          swipeEdgeWidth: currentScreenName === 'StoresScreen' ? 0 : edgeWidth,
          swipeEnabled: currentScreenName !== 'StoresScreen',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-primary' size={30} />
            </Pressable>
          ),
          headerRight: () => <DrawerToggleButton />,
          headerTitleStyle: {
            fontFamily: 'Inter_18pt-SemiBold',
            fontSize: 18,
          },
          headerLeftContainerStyle: { paddingLeft: 24 },
        }}
        drawerContent={(props) => <DrawerNavigationContent {...props} />}
      >
        <Drawer.Screen
          name='RootBottomTabs'
          component={RootBottomTabs}
          options={{
            headerShown: false,
            swipeEnabled: currentScreenName !== 'StoresScreen',
          }}
        />
        <Drawer.Screen
          name='ProductDetailScreen'
          component={ProductDetailScreen}
          options={() => ({
            headerTitle: 'Detail Product',
            headerTitleAlign: 'center',
            swipeEnabled: currentScreenName !== 'StoresScreen',
            headerRight: () => (
              <View className='flex-row items-center gap-[10]'>
                <MainHeaderRight />
                <DrawerToggleButton />
              </View>
            ),
          })}
        />
      </Drawer.Navigator>
    </DrawerLayout>
  );
};

export default RootDrawer;
