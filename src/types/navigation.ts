import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/*
 *  Root Stack
 *  │
 *  ├── Auth Stack
 *  │   ├── Login Screen
 *  │   ├── Register Screen
 *  │   ├── Forgot Password Screen
 *  │   ├── Forgot Password Confirm Screen
 *  │   ├── OTP Screen
 *  │   └── Reset Password Screen
 *  │
 *  ├── Main (Drawer Navigator)
 *  │   ├── Profile Screen
 *  │   └── Bottom Tab Navigator
 *  │       ├── Home Screen
 *  │       ├── Stores (Stores Stack)
 *  │       │   ├── Product List Screen
 *  │       │   └── Product Detail Screen
 *  │       └── Me Screen
 */

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordConfirmScreen: { email: string };
  OTPScreen: { email: string };
  ResetPasswordScreen: { token: string };
};

export type StoresStackParamList = {
  ProductListScreen: undefined;
  ProductDetailScreen: { id: number };
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  StoresStack: NavigatorScreenParams<StoresStackParamList>;
  MeScreen: undefined;
};

export type MainStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<BottomTabParamList>;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'HomeScreen'>,
  NativeStackScreenProps<RootStackParamList> & NativeStackScreenProps<StoresStackParamList>
>;

export type LoginScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RegisterScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ForgotPasswordScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ForgotPasswordConfirmScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordConfirmScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OTPScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'OTPScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ResetPasswordScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'ResetPasswordScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type StoresScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'Main'>,
  BottomTabScreenProps<BottomTabParamList, 'StoresStack'>
>;

export type ProductListScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<StoresStackParamList, 'ProductListScreen'>,
  BottomTabScreenProps<BottomTabParamList, 'StoresStack'>
>;

export type ProductDetailScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<StoresStackParamList, 'ProductDetailScreen'>,
  BottomTabScreenProps<BottomTabParamList, 'StoresStack'>
>;

export type MeScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'Main'>,
  BottomTabScreenProps<BottomTabParamList, 'MeScreen'>
>;
