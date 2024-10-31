import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { CircleUser, ListFilter, Store } from '~components/icons';
import House from '~components/icons/House';
import { Badge } from '~components/ui/badge';
import HomeScreen from '~screens/HomeScreen';
import MeScreen from '~screens/MeScreen';
import StoresScreen from '~screens/StoresScreen';
import { useStore } from '~store';
import { RootBottomTabsParamList } from '~types/navigation.type';

const BottomTab = createBottomTabNavigator<RootBottomTabsParamList>();

const RootBottomTabs = () => {
  const { isFilterSortingActive, onStoresDrawerOpen, resetFilterSorting } = useStore(
    useShallow((state) => ({
      isFilterSortingActive: state.isFilterSortingActive,
      onStoresDrawerOpen: state.onStoresDrawerOpen,
      resetFilterSorting: state.resetFilterSorting,
    })),
  );

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: { height: 56 },
        tabBarLabelStyle: { fontFamily: 'Inter_18pt-SemiBold', fontSize: 12 },
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#71717A',
        headerLeft: () => <MainHeaderLeft />,
        headerRight: () => <MainHeaderRight />,
        headerLeftContainerStyle: { paddingLeft: 24 },
        headerRightContainerStyle: { paddingRight: 24 },
      }}
      screenListeners={() => ({
        tabPress: resetFilterSorting,
      })}
    >
      <BottomTab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
          headerTitle: '',
        }}
      />
      <BottomTab.Screen
        name='StoresScreen'
        component={StoresScreen}
        options={{
          tabBarLabel: 'Stores',
          tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
          title: 'Store',
          headerLeft: undefined,
          headerRight: () => (
            <View className='flex-row gap-[18px]'>
              <MainHeaderRight />
              <Pressable onPress={onStoresDrawerOpen}>
                <ListFilter className='text-foreground' size={26} />
                {isFilterSortingActive && (
                  <Badge
                    pointerEvents='none'
                    className='absolute top-[1px] right-[-2px] items-center justify-center p-0 w-[12px] h-[12px]'
                    variant='destructive'
                  />
                )}
              </Pressable>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name='MeScreen'
        component={MeScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color, size }) => <CircleUser color={color} size={size} />,
          headerTitle: '',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootBottomTabs;
