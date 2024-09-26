import { AuthSlice } from './auth/auth.type';
import { ProductDetailSlice } from './product-detail/product-detail.type';

export type Store = AuthSlice & ProductDetailSlice;
