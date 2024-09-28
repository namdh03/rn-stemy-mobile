import { GetCartQuery } from '~graphql/graphql';

type SelectedCart = {
  [key: string]: GetCartQuery['carts'][number];
};

export type CartState = {
  cart: GetCartQuery['carts'];
  selectedCart?: SelectedCart;
  total: number;
};

export type CartActions = {
  setCart: (carts: GetCartQuery['carts']) => void;
  setSelectedCart: (cart: GetCartQuery['carts'][number]) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;
