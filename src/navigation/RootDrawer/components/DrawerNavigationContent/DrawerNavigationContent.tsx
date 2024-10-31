import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CircleUser, Store } from '~components/icons';
import House from '~components/icons/House';
import { useStore } from '~store';
import { RootBottomTabsParamList, RootStackParamList } from '~types/navigation.type';

const DrawerNavigationContent: FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { resetFilterSorting } = useStore(
    useShallow((state) => ({
      resetFilterSorting: state.resetFilterSorting,
    })),
  );

  const handleNavigation = (screen: keyof RootBottomTabsParamList) => {
    resetFilterSorting();
    navigation.navigate('RootDrawer', { screen: 'RootBottomTabs', params: { screen } });
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={({ color, size }) => <House color={color} size={size} />}
        label='Home'
        onPress={handleNavigation.bind(null, 'HomeScreen')}
      />
      <DrawerItem
        icon={({ color, size }) => <Store color={color} size={size} />}
        label='Stores'
        onPress={handleNavigation.bind(null, 'StoresScreen')}
      />
      <DrawerItem
        icon={({ color, size }) => <CircleUser color={color} size={size} />}
        label='Me'
        onPress={handleNavigation.bind(null, 'MeScreen')}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerNavigationContent;
