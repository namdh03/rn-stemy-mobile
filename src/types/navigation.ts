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
 *  └── Main Stack
 *      ├── Bottom Tab
 *      │   ├── Home Screen
 *      │   ├── Stores Screen
 *      │   └── Me Screen
 *      ├── Product Detail Stack
 *      │   ├── Product Detail Screen
 *      │   └── Product Feedback Screen
 *      ├── Cart Screen
 *      └── Checkout Screen
 */

// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth Stack
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordConfirmScreen: { email: string };
  OTPScreen: { email: string };
  ResetPasswordScreen: { token: string };
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};

// Bottom Tab
export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  StoresScreen: undefined;
  MeScreen: undefined;
};

// Product Detail Stack
export type ProductDetailStackParamList = {
  ProductDetailScreen: { id: string };
  ProductFeedbackScreen: { rating: number };
};

// Main Stack
export type MainStackParamList = {
  BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
  ProductDetailStack: NavigatorScreenParams<ProductDetailStackParamList>;
  CartScreen: undefined;
  CheckoutScreen: undefined;
};

// Root Stack
export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

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

export type HomeScreenScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>,
  CompositeScreenProps<NativeStackScreenProps<BottomTabParamList>, NativeStackScreenProps<MainStackParamList>>
>;

export type StoresScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParamList, 'StoresScreen'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type ProductDetailScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<ProductDetailStackParamList, 'ProductDetailScreen'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type ProductFeedbackScreenNavigationProps = NativeStackScreenProps<
  ProductDetailStackParamList,
  'ProductFeedbackScreen'
>;

export type CartScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'CartScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type CheckoutScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'CheckoutScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;
