import { AuthSlice } from './auth/auth.type';
import { CartSlice } from './cart/cart.type';
import { CheckoutSlice } from './checkout/checkout.type';
import { ProductDetailSlice } from './product-detail/product-detail.type';

export type Store = AuthSlice & ProductDetailSlice & CartSlice & CheckoutSlice;
