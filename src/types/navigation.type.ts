/*
 *  Auth Stack
 *  ├── Login Screen
 *  ├── Register Screen
 *  ├── Forgot Password Screen
 *  ├── Forgot Password Confirm Screen
 *  ├── OTP Screen
 *  └── Reset Password Screen
 */

/*
 *  Root Stack
 *  ├── Root Drawer
 *  │   ├── Root Bottom Tabs
 *  │   │   ├── Home Screen
 *  │   │   ├── Stores Screen
 *  │   │   └── Me Screen
 *  │   ├── Product Detail Screen
 *  │   └── Product Feedback Screen
 *  ├── Cart Screen
 *  ├── Checkout Screen
 *  ├── Checkout User Information Screen
 *  ├── Order Progress Screen
 *  ├── Order Success Screen
 *  ├── Order Error Screen
 *  ├── Search Product Screen
 *  ├── My Orders Screen
 *  ├── Search Orders Screen
 *  ├── Order Detail Screen
 *  ├── Order History Screen
 *  ├── Feedback Product Screen
 *  ├── My Purchases Screen
 *  ├── Settings Screen
 *  ├── My Tickets Screen
 *  ├── Search My Purchases Screen
 *  ├── Create Ticket Screen
 *  └── Ticket Detail Screen
 */

/*
 *  Staff Stack
 *  ├── Staff Bottom Tabs
 *  │   ├── Support Screen
 *  │   ├── Delivery Screen
 *  │   └── Staff Profile Screen
 *  └── Support Ticket Detail Screen
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CheckoutOrderInput, GetOrderByStatusQuery, OrderStatus, TicketStatus } from '~graphql/graphql';

// * Auth
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordConfirmScreen: { email: string };
  OTPScreen: { email: string };
  ResetPasswordScreen: { token: string };
};

export type LoginScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export type RegisterScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'RegisterScreen'>;

export type ForgotPasswordScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPasswordScreen'>;

export type ForgotPasswordConfirmScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPasswordConfirmScreen'
>;

export type OTPScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'OTPScreen'>;

export type ResetPasswordScreenNavigationProps = NativeStackScreenProps<AuthStackParamList, 'ResetPasswordScreen'>;

// * Root
export type RootBottomTabsParamList = {
  HomeScreen: undefined;
  StoresScreen: undefined;
  MeScreen: undefined;
};

export type HomeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabsParamList, 'HomeScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type StoresScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabsParamList, 'StoresScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type MeScreenNavigationProps = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabsParamList, 'MeScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootDrawerParamList = {
  RootBottomTabs: NavigatorScreenParams<RootBottomTabsParamList>;
  ProductDetailScreen: { id: string };
  ProductFeedbackScreen: { rating: number };
};

export type ProductDetailScreenNavigationProps = CompositeScreenProps<
  DrawerScreenProps<RootDrawerParamList, 'ProductDetailScreen'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProductFeedbackScreenNavigationProps = DrawerScreenProps<RootDrawerParamList, 'ProductFeedbackScreen'>;

export type RootStackParamList = {
  RootDrawer: NavigatorScreenParams<RootDrawerParamList>;
  CartScreen: undefined;
  CheckoutScreen: undefined;
  CheckoutUserInformationScreen: undefined;
  OrderProgressScreen: CheckoutOrderInput | undefined;
  OrderSuccessScreen: { totalPrice: number };
  OrderErrorScreen: undefined;
  SearchProductScreen: undefined;
  MyOrdersScreen: { orderStatus: OrderStatus[] };
  SearchOrdersScreen: undefined;
  OrderDetailScreen: GetOrderByStatusQuery['searchOrder'][number];
  OrderHistoryScreen: undefined;
  FeedbackProductScreen: { order: GetOrderByStatusQuery['searchOrder'][number] };
  MyPurchasesScreen: undefined;
  SettingsScreen: undefined;
  MyTicketsScreen: undefined;
  SearchMyPurchasesScreen: undefined;
  CreateTicketScreen: { orderItemId: string };
  TicketDetailScreen: { index: number; ticketId: string };
};

export type CartScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'CartScreen'>;

export type CheckoutScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'CheckoutScreen'>;

export type OrderProgressScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'OrderProgressScreen'>;

export type OrderSuccessScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'OrderSuccessScreen'>;

export type OrderErrorScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'OrderErrorScreen'>;

export type SearchProductScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'SearchProductScreen'>;

export type MyOrdersScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'MyOrdersScreen'>;

export type OrderDetailScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'OrderDetailScreen'>;

export type OrderHistoryScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'OrderHistoryScreen'>;

export type FeedbackProductScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'FeedbackProductScreen'>;

export type MyPurchasesScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'MyPurchasesScreen'>;

export type MyTicketsScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'MyTicketsScreen'>;

export type TicketDetailScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'TicketDetailScreen'>;

export type CreateTicketScreenNavigationProps = NativeStackScreenProps<RootStackParamList, 'CreateTicketScreen'>;

// * Staff
export type StaffBottomTabsParamList = {
  SupportScreen: undefined;
  DeliveryScreen: undefined;
  StaffProfileScreen: undefined;
};

export type StaffStackParamList = {
  StaffBottomTabs: NavigatorScreenParams<StaffBottomTabsParamList>;
  SupportTicketDetailScreen: { index: number; ticketId: string; status: TicketStatus };
};
