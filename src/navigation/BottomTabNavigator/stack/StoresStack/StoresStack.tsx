import { useState } from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useShallow } from 'zustand/react/shallow';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft, ListFilter } from '~components/icons';
import { Badge } from '~components/ui/badge';
import DrawerFilterSortingContent from '~navigation/BottomTabNavigator/components/DrawerFilterSortingContent';
import StoresScreen from '~screens/StoresScreen';
import { useStore } from '~store';
import { StoresScreenNavigationProps, StoresStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<StoresStackParamList>();

const StoresStack = () => {
  const isFilterSortingActive = useStore(useShallow((state) => state.isFilterSortingActive));
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <Drawer
      open={open}
      onOpen={handleDrawerOpen}
      onClose={handleDrawerClose}
      renderDrawerContent={() => {
        return <DrawerFilterSortingContent onClose={handleDrawerClose} />;
      }}
      drawerPosition='right'
    >
      <Stack.Navigator>
        <Stack.Screen
          name='StoresScreen'
          component={StoresScreen}
          options={({ navigation }: StoresScreenNavigationProps) => ({
            title: 'Store',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <ChevronLeft className='text-foreground' size={30} />
              </Pressable>
            ),
            headerRight: () => (
              <View className='flex-row gap-[18px]'>
                <MainHeaderRight />
                <Pressable onPress={handleDrawerOpen}>
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
            headerLeftContainerStyle: {
              paddingLeft: 24,
            },
            headerRightContainerStyle: {
              paddingRight: 24,
            },
          })}
        />
      </Stack.Navigator>
    </Drawer>
  );
};

export default StoresStack;
