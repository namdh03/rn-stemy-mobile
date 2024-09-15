import { User } from '~types/user.type';

export type AuthState = {
  isAuthenticated: boolean;
  user?: User | null;
};

export type AuthActions = {
  initialize: (isAuthenticated: boolean, user?: User) => void;
  authenticate: (user: User) => void;
  unAuthenticate: () => void;
  reset: () => void;
};

export type AuthSlice = AuthState & AuthActions;
