import { create } from 'zustand';
import { createJSONStorage, devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { zustandStorage } from '~utils/mmkv-storage';

import { createAuthSlice } from './auth/auth-slice';
import { createCartSlice } from './cart/cart-slice';
import { createCheckoutSlice } from './checkout/checkout-slice';
import { createFilterSortingSlice } from './filter-sorting/filter-sorting-slice';
import { createHistorySearchProductSlice } from './history-search-product/history-search-product.slice';
import { createProductDetailSlice } from './product-detail/product-detail-slice';
import { createStoresDrawerSlice } from './stores-drawer/stores-drawer.slice';
import { CartStore, HistorySearchProductStore, Store } from './store.type';

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createProductDetailSlice(...a),
        ...createCheckoutSlice(...a),
        ...createFilterSortingSlice(...a),
        ...createStoresDrawerSlice(...a),
      })),
    ),
  ),
);

export const useCartStore = create<CartStore>()(
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

export const useHistorySearchProductStore = create<HistorySearchProductStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createHistorySearchProductSlice(...a),
        })),
      ),
      {
        name: 'history-search-product-storage',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);
