import { StateCreator } from 'zustand';

import { MeQuery } from '~graphql/graphql';

import { AuthSlice, AuthState } from './auth.type';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const createAuthSlice: StateCreator<AuthSlice, [['zustand/immer', never]], [], AuthSlice> = (set) => ({
  ...initialState,
  initialize: (isAuthenticated: boolean, user?: MeQuery['me']) =>
    set((state) => {
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    }),
  authenticate: (user: MeQuery['me']) =>
    set((state) => {
      state.isAuthenticated = true;
      state.user = user;
    }),
  unAuthenticate: () =>
    set((state) => {
      state.isAuthenticated = false;
      state.user = null;
    }),
  reset: () => set(initialState),
});
