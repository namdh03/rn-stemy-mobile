import { StateCreator } from 'zustand';

import { AuthSlice, AuthState } from './auth.type';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const createAuthSlice: StateCreator<AuthSlice, [['zustand/immer', never]], [], AuthSlice> = (set) => ({
  ...initialState,
  initialize: (isAuthenticated, user) =>
    set((state) => {
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    }),
  authenticate: (user) =>
    set((state) => {
      state.isAuthenticated = true;
      state.user = user;
    }),
  unAuthenticate: () =>
    set((state) => {
      state.isAuthenticated = false;
      state.user = null;
    }),
  resetAuth: () => set(initialState),
});
