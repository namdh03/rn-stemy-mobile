/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  access_token: Scalars['String']['output'];
};

export type Feedback = {
  __typename?: 'Feedback';
  comment: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  orderItem: OrderItem;
  product: Product;
  rating: Scalars['Int']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  forgotPassword: Scalars['String']['output'];
  login: AccessTokenResponse;
  loginWithGoogle: AccessTokenResponse;
  register: AccessTokenResponse;
  resetPassword: Scalars['String']['output'];
};

export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationLoginWithGoogleArgs = {
  code: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  order: Order;
  product: Product;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: ProductCategory;
  description: Scalars['String']['output'];
  feedbacks: Array<Feedback>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProductInput = {
  categoryId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type ProductsWithPaginationResponse = {
  __typename?: 'ProductsWithPaginationResponse';
  items: Array<Product>;
  pageInfo: E;
};

export type Query = {
  __typename?: 'Query';
  getOauth2GoogleURL: Scalars['String']['output'];
  me: User;
  products: ProductsWithPaginationResponse;
  user?: Maybe<User>;
  users: Array<User>;
};

export type QueryProductsArgs = {
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  order?: SortOrder;
  sort?: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Manager = 'MANAGER',
  Staff = 'STAFF',
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  status: UserStatus;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Ban = 'BAN',
}

export type E = {
  __typename?: 'e';
  currentItem: Scalars['Int']['output'];
  currentPage: Scalars['Int']['output'];
  totalItem: Scalars['Int']['output'];
  totalPage: Scalars['Int']['output'];
};

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutationMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'AccessTokenResponse'; access_token: string };
};

export type RegisterMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;

export type RegisterMutationMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'AccessTokenResponse'; access_token: string };
};

export type MeQueryQueryVariables = Exact<{ [key: string]: never }>;

export type MeQueryQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    email?: string | null;
    fullName?: string | null;
    id: string;
    phone?: string | null;
    role: Role;
    status: UserStatus;
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any>,
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LoginMutationDocument = new TypedDocumentString(`
    mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<LoginMutationMutation, LoginMutationMutationVariables>;
export const RegisterMutationDocument = new TypedDocumentString(`
    mutation RegisterMutation($email: String!, $fullName: String!, $password: String!, $phone: String!) {
  register(email: $email, fullName: $fullName, password: $password, phone: $phone) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const MeQueryDocument = new TypedDocumentString(`
    query MeQuery {
  me {
    email
    fullName
    id
    phone
    role
    status
  }
}
    `) as unknown as TypedDocumentString<MeQueryQuery, MeQueryQueryVariables>;
