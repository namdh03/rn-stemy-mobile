import { Role, UserStatus } from '~graphql/graphql';

export interface User {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  phone?: string | null;
  role: Role;
  status: UserStatus;
  updatedAt: string;
}
