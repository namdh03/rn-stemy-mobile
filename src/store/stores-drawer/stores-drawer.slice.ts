import { StateCreator } from 'zustand';

import { StoresDrawerSlice, StoresDrawerState } from './stores-drawer.type';

const initialState: StoresDrawerState = {
  openStoresDrawer: false,
};

export const createStoresDrawerSlice: StateCreator<
  StoresDrawerSlice,
  [['zustand/immer', never]],
  [],
  StoresDrawerSlice
> = (set) => ({
  ...initialState,
  onStoresDrawerOpen: () =>
    set((state) => {
      state.openStoresDrawer = true;
    }),
  onStoresDrawerClose: () =>
    set((state) => {
      state.openStoresDrawer = false;
    }),
  reset: () => set(initialState),
});
