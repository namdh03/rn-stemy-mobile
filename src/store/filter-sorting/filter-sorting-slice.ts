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
