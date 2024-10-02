export type HistorySearchProductState = {
  list: string[];
};

export type HistorySearchProductActions = {
  setItem: (value: string) => void;
  reset: () => void;
};

export type HistorySearchProductSlice = HistorySearchProductState & HistorySearchProductActions;
