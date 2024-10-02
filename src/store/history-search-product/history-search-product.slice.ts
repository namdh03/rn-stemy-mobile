import { StateCreator } from 'zustand';

import { HistoryList, HistorySearchProductSlice, HistorySearchProductState } from './history-search-product.type';

const initialState: HistorySearchProductState = {
  list: undefined,
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
      const newList = {
        ...state.list,
        [item.id]: item,
      };

      // Directly check if we need to limit the list
      if (Object.keys(newList).length > 10) {
        state.list = Object.keys(newList)
          .slice(0, 10)
          .reduce((acc, key) => {
            acc[key] = newList[key];
            return acc;
          }, {} as HistoryList);
      } else {
        state.list = newList;
      }
    }),
  removeItem: (id) =>
    set((state) => {
      if (state.list) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _, ...rest } = state.list;
        state.list = rest;
      }
    }),
  reset: () => set(initialState),
});
