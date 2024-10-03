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
  setItem: (item) =>
    set((state) => {
      // Find index of the item if it exists
      const index = state.list.findIndex((product) => product.id === item.id);

      if (index !== -1) {
        // If item exists, remove it from current position
        state.list.splice(index, 1);
      }

      // Add item to the front of the list
      state.list.unshift(item);
    }),
  removeItem: (id) =>
    set((state) => {
      // Filter the list to remove the item by id
      state.list = state.list.filter((product) => product.id !== id);
    }),
  reset: () => set(initialState),
});
