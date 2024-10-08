import { StateCreator } from 'zustand';

import { CartSlice, CartState, SelectedCart } from './cart.type';

const initialState: CartState = {
  isActive: false,
  cart: [],
  selectedCart: undefined,
  total: 0,
};

export const createCartSlice: StateCreator<CartSlice, [['zustand/immer', never]], [], CartSlice> = (set) => ({
  ...initialState,
  toggleActive: () =>
    set((state) => {
      state.isActive = !state.isActive;
    }),
  setCart: (cart) =>
    set((state) => {
      state.cart = cart.map((cartItem) => {
        const newCartItem = { ...cartItem };

        if (newCartItem.hasLab) {
          newCartItem.product = {
            ...newCartItem.product,
            price: newCartItem.product.price + (newCartItem.product.lab?.price || 0),
          };
        }

        return newCartItem;
      });
    }),
  setSelectedCart: (cartItem) =>
    set((state) => {
      const selectedCart = state.selectedCart || {};

      // Toggle the selected cart item
      if (selectedCart[cartItem.id]) {
        delete selectedCart[cartItem.id];
      } else {
        selectedCart[cartItem.id] = cartItem;
      }

      const total = Object.values(selectedCart).reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
      state.selectedCart = selectedCart;
      state.total = total;
    }),
  setMultipleSelectedCart: (cartItems) =>
    set((state) => {
      let total = 0;
      const selectedCart = {} as SelectedCart;

      cartItems.forEach((cartItem) => {
        selectedCart[cartItem.id] = cartItem;
        total += cartItem.product.price * cartItem.quantity;
      });

      state.selectedCart = selectedCart;
      state.total = total;
    }),
  clearOrderedCart: () =>
    set((state) => {
      const selectedCart = state.selectedCart || {};
      const updatedCart = state.cart.filter((cartItem) => !selectedCart[cartItem.id]);

      state.cart = updatedCart;
      state.selectedCart = undefined;
      state.total = 0;
    }),
  updateCartItemQuantity: (id, quantity) =>
    set((state) => {
      const cart = state.cart;

      const cartItemIndex = cart.findIndex((item) => item.id === id);

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].quantity = quantity;

        const selectedCart = state.selectedCart || {};
        if (selectedCart[id]) {
          selectedCart[id].quantity = quantity;
        }

        const total = Object.values(selectedCart).reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);

        state.cart = [...cart];
        state.selectedCart = selectedCart;
        state.total = total;
      }
    }),
  removeCartItem: (id) =>
    set((state) => {
      const selectedCart = state.selectedCart || {};
      const cart = state.cart;

      if (selectedCart[id]) {
        delete selectedCart[id];
      }

      const updatedCart = cart.filter((cartItem) => cartItem.id !== id);

      const total = Object.values(selectedCart).reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);

      state.cart = updatedCart;
      state.selectedCart = selectedCart;
      state.total = total;
    }),
  reset: () => set(initialState),
});
