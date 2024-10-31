import { GetCartQuery } from '~graphql/graphql';

export type SelectedCart = {
  [key: string]: GetCartQuery['carts'][number];
};

export type CartState = {
  cart: GetCartQuery['carts'];
  selectedCart: SelectedCart;
  total: number;
};

export type CartActions = {
  setCart: (carts: GetCartQuery['carts']) => void;
  setSelectedCart: (cartItem: GetCartQuery['carts'][number]) => void;
  setMultipleSelectedCart: (cartItems: GetCartQuery['carts']) => void;
  clearOrderedCart: () => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  syncWithServer: (serverCart: GetCartQuery['carts']) => void;
  resetCart: () => void;
};

export type CartSlice = CartState & CartActions;
