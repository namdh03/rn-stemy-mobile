import { StateCreator } from 'zustand';

import { GetCartQuery } from '~graphql/graphql';

import { CartSlice, CartState } from './cart.type';

const initialState: CartState = {
  cart: [],
  selectedCart: undefined,
  total: 0,
};

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (set) => ({
  ...initialState,
  setCart: (cart: GetCartQuery['carts']) =>
    set((state) => {
      state.cart = cart;
      state.total = cart?.reduce((acc, cur) => acc + cur.product.price, 0) || 0;
    }),
  setSelectedCart: (cart: GetCartQuery['carts'][number]) =>
    set((state) => {
      const selectedCart = state.selectedCart || {};

      if (selectedCart[cart.id]) {
        delete selectedCart[cart.id];
      } else {
        selectedCart[cart.id] = cart;
      }

      state.selectedCart = selectedCart;
    }),
  reset: () => set(initialState),
});
