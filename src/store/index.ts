import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createAuthSlice } from './auth/auth-slice';
import { createCartSlice } from './cart/cart-slice';
import { createCheckoutSlice } from './checkout/checkout-slice';
import { createProductDetailSlice } from './product-detail/product-detail-slice';
import { Store } from './store.type';

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createProductDetailSlice(...a),
        ...createCartSlice(...a),
        ...createCheckoutSlice(...a),
      })),
    ),
  ),
);
