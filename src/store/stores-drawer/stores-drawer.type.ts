export type StoresDrawerState = {
  openStoresDrawer: boolean;
};

export type StoresDrawerActions = {
  onStoresDrawerOpen: () => void;
  onStoresDrawerClose: () => void;
  resetStoresDrawer: () => void;
};

export type StoresDrawerSlice = StoresDrawerState & StoresDrawerActions;
