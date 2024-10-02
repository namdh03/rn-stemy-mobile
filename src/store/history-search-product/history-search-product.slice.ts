import { StateCreator } from 'zustand';

import { HistorySearchProductSlice, HistorySearchProductState } from './history-search-product.type';

const initialState: HistorySearchProductState = {
  list: [],
};

export const createHistorySearchProductSlice: StateCreator<
  HistorySearchProductSlice,
  [['zustand/immer', never]],
  [],
  HistorySearchProductSlice
> = (set) => ({
  ...initialState,
  setItem: (value) =>
    set((state) => {
      state.list.push(value);
    }),
  reset: () => set(initialState),
});
