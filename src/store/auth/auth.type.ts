import { MeQuery } from '~graphql/graphql';

export type AuthState = {
  isAuthenticated: boolean;
  user?: MeQuery | null;
};

export type AuthActions = {
  initialize: (isAuthenticated: boolean, user?: MeQuery) => void;
  authenticate: (user: MeQuery) => void;
  unAuthenticate: () => void;
  reset: () => void;
};

export type AuthSlice = AuthState & AuthActions;
