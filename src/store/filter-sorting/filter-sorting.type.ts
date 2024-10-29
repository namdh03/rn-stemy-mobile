import { FilterAndSortingProductQueryVariables } from '~graphql/graphql';

export type FilterSortingState = {
  isFilterSortingActive: boolean;
  storesFilterSorting: FilterAndSortingProductQueryVariables;
};

export type FilterSortingActions = {
  setFilterSorting: (data: Partial<FilterAndSortingProductQueryVariables>) => void;
  clearFilterSorting: () => void;
  resetFilterSorting: () => void;
};

export type FilterSortingSlice = FilterSortingState & FilterSortingActions;
