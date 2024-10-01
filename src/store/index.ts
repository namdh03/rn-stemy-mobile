import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandStorage } from '~utils/mmkv-storage';

import { createAuthSlice } from './auth/auth-slice';
import { createCartSlice } from './cart/cart-slice';
import { createCheckoutSlice } from './checkout/checkout-slice';
import { createProductDetailSlice } from './product-detail/product-detail-slice';
import { Cart, Store } from './store.type';

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createProductDetailSlice(...a),
        ...createCheckoutSlice(...a),
      })),
    ),
  ),
);

export const useCartStore = create<Cart>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createCartSlice(...a),
        })),
      ),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);
