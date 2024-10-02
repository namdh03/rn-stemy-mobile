import { Product } from '~graphql/graphql';

export type HistoryList = {
  [key: string]: Pick<Product, 'id' | 'name'>;
};

export type HistorySearchProductState = {
  list?: HistoryList;
};

export type HistorySearchProductActions = {
  setItem: (item: Pick<Product, 'id' | 'name'>) => void;
  removeItem: (id: string) => void;
  reset: () => void;
};

export type HistorySearchProductSlice = HistorySearchProductState & HistorySearchProductActions;
