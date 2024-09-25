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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** File upload scalar type */
  File: { input: any; output: any; }
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  access_token: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export enum CategoryType {
  Age = 'AGE',
  Product = 'PRODUCT',
  Topic = 'TOPIC'
}

export type CheckoutOrderInput = {
  vnp_Amount: Scalars['String']['input'];
  vnp_BankCode: Scalars['String']['input'];
  vnp_BankTranNo: Scalars['String']['input'];
  vnp_CardType: Scalars['String']['input'];
  vnp_OrderInfo: Scalars['String']['input'];
  vnp_PayDate: Scalars['String']['input'];
  vnp_ResponseCode: Scalars['String']['input'];
  vnp_SecureHash: Scalars['String']['input'];
  vnp_TmnCode: Scalars['String']['input'];
  vnp_TransactionNo: Scalars['String']['input'];
  vnp_TransactionStatus: Scalars['String']['input'];
  vnp_TxnRef: Scalars['String']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  orderItem: OrderItem;
  product: Product;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Cart;
  checkoutOrder: Scalars['Boolean']['output'];
  createOrder: Scalars['String']['output'];
  createProduct: Product;
  deleteCart: Scalars['String']['output'];
  getTokenResetPassword: Scalars['String']['output'];
  login: AccessTokenResponse;
  loginWithGoogle: AccessTokenResponse;
  register: AccessTokenResponse;
  resetPassword: Scalars['String']['output'];
  sendResetPasswordOTP: Scalars['String']['output'];
  updateCart: Cart;
};


export type MutationAddToCartArgs = {
  productId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};


export type MutationCheckoutOrderArgs = {
  input: CheckoutOrderInput;
};


export type MutationCreateOrderArgs = {
  address: Scalars['String']['input'];
  cartIds: Scalars['Int']['input'];
  paymentProvider: PaymentProvider;
  phone: Scalars['String']['input'];
};


export type MutationCreateProductArgs = {
  images: Array<Scalars['File']['input']>;
  input: ProductInput;
  lab: Scalars['File']['input'];
};


export type MutationDeleteCartArgs = {
  productId: Scalars['Float']['input'];
};


export type MutationGetTokenResetPasswordArgs = {
  OTPCode: Scalars['String']['input'];
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


export type MutationSendResetPasswordOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateCartArgs = {
  productId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  order: Order;
  product: Product;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum PaymentProvider {
  Vnpay = 'VNPAY'
}

export type Product = {
  __typename?: 'Product';
  categories: Array<ProductCategory>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  feedbacks: Array<Feedback>;
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  sold: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  title: Scalars['String']['output'];
  type: Array<CategoryType>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

export type ProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
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
  carts?: Maybe<Array<Cart>>;
  countCart: Scalars['Float']['output'];
  me: User;
  product: Product;
  productCategories: Array<ProductCategory>;
  products: ProductsWithPaginationResponse;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['Float']['input'];
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
  Staff = 'STAFF'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Role;
  status: UserStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum UserStatus {
  Active = 'ACTIVE',
  Ban = 'BAN'
}

export type E = {
  __typename?: 'e';
  currentItem: Scalars['Int']['output'];
  currentPage: Scalars['Int']['output'];
  totalItem: Scalars['Int']['output'];
  totalPage: Scalars['Int']['output'];
};

export type GetProductQueryQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;

export type GetProductQueryQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'Product';
    description: string;
    id: string;
    name: string;
    price: number;
    rating: number;
    sold: number;
    images: Array<{ __typename?: 'ProductImage'; id: string; url: string }>;
    feedbacks: Array<{
      __typename?: 'Feedback';
      comment: string;
      createdAt: any;
      id: string;
      rating: number;
      user: { __typename?: 'User'; fullName: string };
    }>;
  };
};

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AccessTokenResponse', access_token: string } };

export type RegisterMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'AccessTokenResponse', access_token: string } };

export type SendResetPasswordOtpMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendResetPasswordOtpMutationMutation = { __typename?: 'Mutation', sendResetPasswordOTP: string };

export type GetTokenResetPasswordMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  OTPCode: Scalars['String']['input'];
}>;


export type GetTokenResetPasswordMutationMutation = { __typename?: 'Mutation', getTokenResetPassword: string };

export type ResetPasswordMutationMutationVariables = Exact<{
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutationMutation = { __typename?: 'Mutation', resetPassword: string };

export type LoginWithGoogleMutationMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutationMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AccessTokenResponse', access_token: string } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', email: string, fullName: string, id: string, phone?: string | null, role: Role, status: UserStatus } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetProductQueryDocument = new TypedDocumentString(`
    query GetProductQuery($id: Float!) {
  product(id: $id) {
    images {
      id
      url
    }
    description
    id
    name
    price
    rating
    sold
    feedbacks {
      comment
      createdAt
      id
      rating
      user {
        fullName
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductQueryQuery, GetProductQueryQueryVariables>;
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
export const SendResetPasswordOtpMutationDocument = new TypedDocumentString(`
    mutation SendResetPasswordOTPMutation($email: String!) {
  sendResetPasswordOTP(email: $email)
}
    `) as unknown as TypedDocumentString<SendResetPasswordOtpMutationMutation, SendResetPasswordOtpMutationMutationVariables>;
export const GetTokenResetPasswordMutationDocument = new TypedDocumentString(`
    mutation GetTokenResetPasswordMutation($email: String!, $OTPCode: String!) {
  getTokenResetPassword(email: $email, OTPCode: $OTPCode)
}
    `) as unknown as TypedDocumentString<GetTokenResetPasswordMutationMutation, GetTokenResetPasswordMutationMutationVariables>;
export const ResetPasswordMutationDocument = new TypedDocumentString(`
    mutation ResetPasswordMutation($password: String!, $token: String!) {
  resetPassword(password: $password, token: $token)
}
    `) as unknown as TypedDocumentString<ResetPasswordMutationMutation, ResetPasswordMutationMutationVariables>;
export const LoginWithGoogleMutationDocument = new TypedDocumentString(`
    mutation LoginWithGoogleMutation($code: String!) {
  loginWithGoogle(code: $code) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<LoginWithGoogleMutationMutation, LoginWithGoogleMutationMutationVariables>;
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