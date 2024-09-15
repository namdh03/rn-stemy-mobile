import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/*
 *  Root Stack
 *  │
 *  ├── Auth Stack
 *  │   ├── Login Screen
 *  │   └── Register Screen
 *  │
 *  ├── Main (Drawer Navigator)
 *  │   ├── Profile Screen
 *  │   └── Bottom Tab Navigator
 *  │       ├── Home Screen
 *  │       ├── Product (Product Stack)
 *  │       │   ├── Product List Screen
 *  │       │   └── Product Detail Screen
 *  │       ├── Settings Screen
 *  │       └── Favorite Screen
 */

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  ProductScreen: undefined;
  SettingsScreen: undefined;
  FavoriteScreen: undefined;
};

export type ProductStackParamList = {
  ProductListScreen: undefined;
  ProductDetailScreen: { id: string };
};

export type DrawerParamList = {
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<BottomTabParamList>;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'HomeScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type LoginScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RegisterScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;
