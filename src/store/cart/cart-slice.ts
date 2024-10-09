import { StateCreator } from 'zustand';

import { CartSlice, CartState, SelectedCart } from './cart.type';

const initialState: CartState = {
  cart: [],
  selectedCart: {},
  total: 0,
};

const calculateTotal = (selectedCart: SelectedCart): number => {
  return Object.values(selectedCart).reduce(
    (acc, cur) =>
      acc + (cur.hasLab ? cur.product.price + (cur.product.lab?.price || 0) : cur.product.price) * cur.quantity,
    0,
  );
};

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (set, get) => ({
  ...initialState,

  setCart: (cart) => {
    set((state) => {
      state.cart = cart;
    });
    get().syncWithServer(cart);
  },

  setSelectedCart: (cartItem) =>
    set((state) => {
      if (state.selectedCart[cartItem.id]) {
        delete state.selectedCart[cartItem.id];
      } else {
        state.selectedCart[cartItem.id] = cartItem;
      }
      state.total = calculateTotal(state.selectedCart);
    }),

  setMultipleSelectedCart: (cartItems) =>
    set((state) => {
      const selectedCart: SelectedCart = {};
      cartItems.forEach((cartItem) => {
        selectedCart[cartItem.id] = cartItem;
      });
      state.selectedCart = selectedCart;
      state.total = calculateTotal(selectedCart);
    }),

  clearOrderedCart: () =>
    set((state) => {
      const selectedCart = state.selectedCart || {};
      state.cart = state.cart.filter((cartItem) => !selectedCart[cartItem.id]);
      state.selectedCart = {};
      state.total = 0;
    }),

  updateCartItemQuantity: (id, quantity) =>
    set((state) => {
      const cartItemIndex = state.cart.findIndex((item) => item.id === id);
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex].quantity = quantity;
        if (state.selectedCart[id]) {
          state.selectedCart[id].quantity = quantity;
        }
        state.total = calculateTotal(state.selectedCart);
      }
    }),

  removeCartItem: (id) =>
    set((state) => {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
      if (state.selectedCart[id]) {
        delete state.selectedCart[id];
      }
      state.total = calculateTotal(state.selectedCart);
    }),

  syncWithServer: (serverCart) =>
    set((state) => {
      const updatedSelectedCart: SelectedCart = state.selectedCart || {};
      Object.keys(serverCart).forEach((id) => {
        const serverItem = serverCart.find((item) => item.id === id);
        if (serverItem) {
          updatedSelectedCart[id] = serverItem;
        }
      });
      state.selectedCart = { ...updatedSelectedCart };
      state.total = calculateTotal(updatedSelectedCart);
    }),

  reset: () => set(initialState),
});
