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
 *      │   ├── Home Stack
 *      │   │   └── Home Screen
 *      │   ├── Stores Stack
 *      │   │   ├── Stores Screen
 *      │   └── Me Screen
 *      ├── Product Detail Stack
 *      │   ├── Product Detail Screen
 *      │   └── Product Feedback Screen
 *      ├── Cart Screen
 *      ├── Checkout Screen
 *      ├── Checkout User Information Screen
 *      ├── Order Progress Screen
 *      ├── Order Success Screen
 *      ├── Order Error Screen
 *      ├── Search Product Screen
 *      ├── My Orders Screen
 *      ├── Search Orders Screen
 *      ├── Order Detail Screen
 *      ├── Order History Screen
 *      ├── Feedback Product Screen
 *      └── My Purchases Screen
 */

// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CheckoutOrderInput, GetOrderByStatusQuery, OrderStatus } from '~graphql/graphql';

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

export type StoresStackParamList = {
  StoresScreen: undefined;
};

export type MeStackParamList = {
  MeScreen: undefined;
};

// Bottom Tab
export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  StoresStack: NavigatorScreenParams<StoresStackParamList>;
  MeStack: NavigatorScreenParams<MeStackParamList>;
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
  CheckoutUserInformationScreen: undefined;
  OrderProgressScreen: CheckoutOrderInput | undefined;
  OrderSuccessScreen: { totalPrice: number };
  OrderErrorScreen: undefined;
  SearchProductScreen: undefined;
  MyOrdersScreen: { orderStatus: OrderStatus };
  SearchOrdersScreen: undefined;
  OrderDetailScreen: GetOrderByStatusQuery['searchOrder'][number];
  OrderHistoryScreen: undefined;
  FeedbackProductScreen: { order: GetOrderByStatusQuery['searchOrder'][number] };
  MyPurchasesScreen: undefined;
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

export type HomeScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>,
  CompositeScreenProps<NativeStackScreenProps<BottomTabParamList>, NativeStackScreenProps<MainStackParamList>>
>;

export type StoresScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<StoresStackParamList, 'StoresScreen'>,
  CompositeScreenProps<NativeStackScreenProps<BottomTabParamList>, NativeStackScreenProps<MainStackParamList>>
>;

export type MeScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MeStackParamList, 'MeScreen'>,
  CompositeScreenProps<NativeStackScreenProps<BottomTabParamList>, NativeStackScreenProps<MainStackParamList>>
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

export type CheckoutUserInformationScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'CheckoutUserInformationScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OrderProgressScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderProgressScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OrderSuccessScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderSuccessScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type OrderErrorScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderErrorScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type SearchProductScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'SearchProductScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type MyOrdersScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'MyOrdersScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type SearchOrdersScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'SearchOrdersScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type OrderDetailScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderDetailScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type OrderHistoryScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderHistoryScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type FeedbackProductScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'FeedbackProductScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;

export type MyPurchasesScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'MyPurchasesScreen'>,
  NativeStackScreenProps<BottomTabParamList>
>;
