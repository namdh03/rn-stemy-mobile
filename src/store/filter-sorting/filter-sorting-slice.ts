import { StateCreator } from 'zustand';

import constants from '~constants';
import { SortOrder } from '~graphql/graphql';

import { FilterSortingSlice, FilterSortingState } from './filter-sorting.type';

const initialState: FilterSortingState = {
  storesFilterSorting: {
    categoryIds: [],
    currentItem: constants.FILTER_SORTING.DEFAULT_CURRENT_ITEM,
    currentPage: constants.FILTER_SORTING.DEFAULT_CURRENT_PAGE,
    order: SortOrder.Asc,
    search: '',
    sort: constants.FILTER_SORTING.DEFAULT_SORT_BY_FIELD,
    maxRating: constants.FILTER_SORTING.MAX_RATING_VALUE,
    minRating: constants.FILTER_SORTING.MIN_RATING_VALUE,
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
    set((state) => {
      state.storesFilterSorting = { ...state.storesFilterSorting, ...newData };
    }),
  clearFilterStoring: () =>
    set((state) => {
      state.storesFilterSorting = { ...initialState.storesFilterSorting };
    }),
  reset: () => set(() => ({ ...initialState })),
});
