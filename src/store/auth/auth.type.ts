import { MeQuery } from '~graphql/graphql';

export type AuthState = {
  isAuthenticated: boolean;
  user?: MeQuery['me'] | null;
};

export type AuthActions = {
  initialize: (isAuthenticated: boolean, user?: MeQuery['me']) => void;
  authenticate: (user: MeQuery['me']) => void;
  unAuthenticate: () => void;
  reset: () => void;
};

export type AuthSlice = AuthState & AuthActions;
