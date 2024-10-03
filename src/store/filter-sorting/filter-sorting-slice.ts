import { StateCreator } from 'zustand';

import { SortOrder } from '~graphql/graphql';

import { FilterSortingSlice, FilterSortingState } from './filter-sorting.type';

const initialState: FilterSortingState = {
  storesFilterSorting: {
    categoryIds: [],
    currentItem: 12,
    currentPage: 1,
    order: SortOrder.Asc,
    search: '',
    sort: 'name',
  },
};

export const createFilterSortingSlice: StateCreator<
  FilterSortingSlice,
  [['zustand/immer', never]],
  [],
  FilterSortingSlice
> = (set) => ({
  ...initialState,
  setFilterStoring: (newData) =>
    set((state) => ({
      storesFilterSorting: { ...state.storesFilterSorting, ...newData },
    })),
  reset: () => set(initialState),
});
