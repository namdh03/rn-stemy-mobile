import { FilterAndSortingProductQueryVariables } from '~graphql/graphql';

export type FilterSortingState = {
  storesFilterSorting: FilterAndSortingProductQueryVariables;
};

export type FilterSortingActions = {
  setFilterStoring: (data: Partial<FilterAndSortingProductQueryVariables>) => void;
  reset: () => void;
};

export type FilterSortingSlice = FilterSortingState & FilterSortingActions;
