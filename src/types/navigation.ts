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
 *      └── Product Detail Stack
 *          ├── Product Detail Screen
 *          └── Product Feedback Screen
 */

// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ProductFeedbackType } from './feedback.type';

// Auth Stack
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordConfirmScreen: { email: string };
  OTPScreen: { email: string };
  ResetPasswordScreen: { token: string };
};

// Drawer Tab
export type DrawerParamList = {
  HomeScreen: undefined;
};

// Bottom Tab
export type BottomTabParamList = {
  HomeScreen: undefined;
  StoresScreen: undefined;
  MeScreen: undefined;
};

// Product Detail Stack
export type ProductDetailStackParamList = {
  ProductDetailScreen: { id: number };
  ProductFeedbackScreen: { rating: number; feedbacks: ProductFeedbackType[] };
};

// Main Stack
export type MainStackParamList = {
  DrawerStack: NavigatorScreenParams<DrawerParamList>;
  BottomTabStack: NavigatorScreenParams<BottomTabParamList>;
  ProductDetailStack: NavigatorScreenParams<ProductDetailStackParamList>;
};

// Root Stack
export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainStack: NavigatorScreenParams<MainStackParamList>;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParamList, 'HomeScreen'>,
  NativeStackScreenProps<MainStackParamList>
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

export type ProductDetailScreenNavigationProps = NativeStackScreenProps<
  ProductDetailStackParamList,
  'ProductDetailScreen'
>;

export type ProductFeedbackScreenNavigationProps = NativeStackScreenProps<
  ProductDetailStackParamList,
  'ProductFeedbackScreen'
>;
