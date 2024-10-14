import { StateCreator } from 'zustand';

import { AnimationRefSlice, AnimationRefState } from './animation-ref.type';

const initialState: AnimationRefState = {
  cartIconRef: null,
};

export const createAnimationRefSlice: StateCreator<
  AnimationRefSlice,
  [['zustand/immer', never]],
  [],
  AnimationRefSlice
> = (set) => ({
  ...initialState,
  setCartIconRef: (ref) => set({ cartIconRef: ref }),
  reset: () => set({ ...initialState }),
});
