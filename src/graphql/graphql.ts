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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
  /** File upload scalar type */
  File: { input: any; output: any };
};

export type AccessTokenResponse = {
  __typename?: 'AccessTokenResponse';
  access_token: Scalars['String']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTimeISO']['output'];
  hasLab: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user: User;
};

export enum CategoryType {
  Age = 'AGE',
  Product = 'PRODUCT',
  Topic = 'TOPIC',
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

export type CountOrderResponse = {
  __typename?: 'CountOrderResponse';
  delivered: Scalars['Float']['output'];
  delivering: Scalars['Float']['output'];
  paid: Scalars['Float']['output'];
  rated: Scalars['Float']['output'];
  received: Scalars['Float']['output'];
  unpaid: Scalars['Float']['output'];
};

export type CreateFeedbackInput = {
  images?: InputMaybe<Array<Scalars['File']['input']>>;
  note?: InputMaybe<Scalars['String']['input']>;
  orderItemId: Scalars['Int']['input'];
  rating: Scalars['Float']['input'];
};

export type Feedback = {
  __typename?: 'Feedback';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<FeedbackImage>>;
  note?: Maybe<Scalars['String']['output']>;
  orderItem: OrderItem;
  product: Product;
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user: User;
};

export type FeedbackImage = {
  __typename?: 'FeedbackImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Cart;
  checkoutOrder: Scalars['Boolean']['output'];
  createFeedback: Scalars['Boolean']['output'];
  createOrder: Scalars['String']['output'];
  createProduct: Product;
  createProductCategory: ProductCategory;
  createTicket: Ticket;
  deleteCarts: Scalars['String']['output'];
  deleteProduct: Product;
  deleteProductCategory: ProductCategory;
  getTokenResetPassword: Scalars['String']['output'];
  login: AccessTokenResponse;
  loginWithGoogle: AccessTokenResponse;
  ratingTicket: Ticket;
  reOrder: Array<Cart>;
  receiveOrder: Order;
  register: AccessTokenResponse;
  repayOrder: Scalars['String']['output'];
  replyTicket: Ticket;
  resetPassword: Scalars['String']['output'];
  sendResetPasswordOTP: Scalars['String']['output'];
  updateAvatar: User;
  updateCart: Cart;
  updateProduct: Product;
  updateProductCategory: ProductCategory;
  updateUser: User;
};

export type MutationAddToCartArgs = {
  hasLab: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type MutationCheckoutOrderArgs = {
  input: CheckoutOrderInput;
};

export type MutationCreateFeedbackArgs = {
  input: Array<CreateFeedbackInput>;
  orderId: Scalars['Float']['input'];
};

export type MutationCreateOrderArgs = {
  address: Scalars['String']['input'];
  cartIds: Array<Scalars['Int']['input']>;
  fullName: Scalars['String']['input'];
  paymentProvider: PaymentProvider;
  phone: Scalars['String']['input'];
};

export type MutationCreateProductArgs = {
  images: Array<Scalars['File']['input']>;
  input: ProductInput;
  lab: Scalars['File']['input'];
};

export type MutationCreateProductCategoryArgs = {
  input: ProductCategoryInput;
};

export type MutationCreateTicketArgs = {
  categoryId: Scalars['Float']['input'];
  comment: Scalars['String']['input'];
  images?: Array<Scalars['File']['input']>;
  orderItemId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type MutationDeleteCartsArgs = {
  cartId: Array<Scalars['Int']['input']>;
};

export type MutationDeleteProductArgs = {
  id: Scalars['Float']['input'];
};

export type MutationDeleteProductCategoryArgs = {
  id: Scalars['Float']['input'];
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

export type MutationRatingTicketArgs = {
  rating: Scalars['Float']['input'];
  ticketId: Scalars['Float']['input'];
};

export type MutationReOrderArgs = {
  orderId: Scalars['Float']['input'];
};

export type MutationReceiveOrderArgs = {
  orderId: Scalars['Float']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type MutationRepayOrderArgs = {
  orderId: Scalars['Float']['input'];
};

export type MutationReplyTicketArgs = {
  comment: Scalars['String']['input'];
  images?: Array<Scalars['File']['input']>;
  ticketId: Scalars['Float']['input'];
};

export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type MutationSendResetPasswordOtpArgs = {
  email: Scalars['String']['input'];
};

export type MutationUpdateAvatarArgs = {
  image: Scalars['File']['input'];
};

export type MutationUpdateCartArgs = {
  cartId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type MutationUpdateProductArgs = {
  id: Scalars['Float']['input'];
  images?: InputMaybe<Array<Scalars['File']['input']>>;
  input: ProductInput;
  lab?: InputMaybe<Scalars['File']['input']>;
};

export type MutationUpdateProductCategoryArgs = {
  id: Scalars['Float']['input'];
  input: ProductCategoryInput;
};

export type MutationUpdateUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  orderItems: Array<OrderItem>;
  payment: OrderPaymentEmbeddable;
  phone: Scalars['String']['output'];
  receiveTime?: Maybe<Scalars['DateTimeISO']['output']>;
  shipTime?: Maybe<Scalars['DateTimeISO']['output']>;
  status: OrderStatus;
  totalPrice: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTimeISO']['output'];
  hasLab: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  labPrice: Scalars['Int']['output'];
  order: Order;
  product: Product;
  productPrice: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  userLab?: Maybe<UserLab>;
};

export type OrderPaymentEmbeddable = {
  __typename?: 'OrderPaymentEmbeddable';
  id?: Maybe<Scalars['String']['output']>;
  provider: PaymentProvider;
  time?: Maybe<Scalars['DateTimeISO']['output']>;
};

export enum OrderStatus {
  Delivered = 'DELIVERED',
  Delivering = 'DELIVERING',
  Paid = 'PAID',
  Rated = 'RATED',
  Received = 'RECEIVED',
  Unpaid = 'UNPAID',
  Unrated = 'UNRATED',
}

export type OrdersWithPaginationResponse = {
  __typename?: 'OrdersWithPaginationResponse';
  items: Array<Order>;
  pageInfo: E;
};

export enum PaymentProvider {
  Vnpay = 'VNPAY',
}

export type Product = {
  __typename?: 'Product';
  categories: Array<ProductCategory>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  feedbacks: Array<Feedback>;
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  lab?: Maybe<ProductLab>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating: Scalars['Float']['output'];
  sold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  title: Scalars['String']['output'];
  type: CategoryType;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type ProductCategoryInput = {
  name: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: CategoryType;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type ProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  labPrice: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type ProductLab = {
  __typename?: 'ProductLab';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export type ProductsWithPaginationResponse = {
  __typename?: 'ProductsWithPaginationResponse';
  items: Array<Product>;
  pageInfo: E;
};

export type Query = {
  __typename?: 'Query';
  carts: Array<Cart>;
  countCart: Scalars['Float']['output'];
  countOrder: CountOrderResponse;
  me: User;
  myTickets: Array<Ticket>;
  order: Order;
  orderItem: OrderItem;
  orders: OrdersWithPaginationResponse;
  product: Product;
  productCategories: Array<ProductCategory>;
  productCategory?: Maybe<ProductCategory>;
  products: ProductsWithPaginationResponse;
  searchOrder: Array<Order>;
  ticket: Ticket;
  ticketCategorys: Array<TicketCategory>;
  tickets: TicketsWithPaginationResponse;
  user?: Maybe<User>;
  userLabs: Array<UserLab>;
  users: Array<User>;
};

export type QueryMyTicketsArgs = {
  status?: InputMaybe<TicketStatus>;
};

export type QueryOrderArgs = {
  id: Scalars['Float']['input'];
};

export type QueryOrderItemArgs = {
  id: Scalars['Float']['input'];
};

export type QueryOrdersArgs = {
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  order?: SortOrder;
  sort?: Scalars['String']['input'];
};

export type QueryProductArgs = {
  id: Scalars['Float']['input'];
};

export type QueryProductCategoryArgs = {
  id: Scalars['Float']['input'];
};

export type QueryProductsArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  order?: SortOrder;
  search?: Scalars['String']['input'];
  sort?: Scalars['String']['input'];
};

export type QuerySearchOrderArgs = {
  search: Scalars['String']['input'];
  status?: InputMaybe<OrderStatus>;
};

export type QueryTicketArgs = {
  ticketId: Scalars['Float']['input'];
};

export type QueryTicketsArgs = {
  currentItem?: Scalars['Int']['input'];
  currentPage?: Scalars['Int']['input'];
  order?: SortOrder;
  sort?: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type ReplyTicketImage = {
  __typename?: 'ReplyTicketImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  owner: Role;
  ticket: Ticket;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
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

export type Ticket = {
  __typename?: 'Ticket';
  category: TicketCategory;
  closedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  images: Array<TicketImage>;
  orderItem: OrderItem;
  rating?: Maybe<Scalars['Float']['output']>;
  replier: User;
  replierComment?: Maybe<Scalars['String']['output']>;
  replyImages: Array<ReplyTicketImage>;
  sender: User;
  senderComment: Scalars['String']['output'];
  status: TicketStatus;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type TicketCategory = {
  __typename?: 'TicketCategory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type TicketImage = {
  __typename?: 'TicketImage';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  owner: Role;
  ticket: Ticket;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  url: Scalars['String']['output'];
};

export enum TicketStatus {
  Close = 'CLOSE',
  Open = 'OPEN',
}

export type TicketsWithPaginationResponse = {
  __typename?: 'TicketsWithPaginationResponse';
  items: Array<Ticket>;
  pageInfo: E;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  numberOfOpenTicket: Scalars['Float']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Float']['output'];
  role: Role;
  status: UserStatus;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type UserLab = {
  __typename?: 'UserLab';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  orderItem: OrderItem;
  productLab: ProductLab;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  user: User;
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

export type AddToCartMutationVariables = Exact<{
  hasLab: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
}>;

export type AddToCartMutation = { __typename?: 'Mutation'; addToCart: { __typename?: 'Cart'; id: string } };

export type GetCartQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartQuery = {
  __typename?: 'Query';
  carts: Array<{
    __typename?: 'Cart';
    id: string;
    hasLab: boolean;
    quantity: number;
    product: {
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      lab?: { __typename?: 'ProductLab'; price: number } | null;
    };
  }>;
};

export type DeleteCartsMutationVariables = Exact<{
  cartId: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;

export type DeleteCartsMutation = { __typename?: 'Mutation'; deleteCarts: string };

export type UpdateCartMutationVariables = Exact<{
  cartId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
}>;

export type UpdateCartMutation = { __typename?: 'Mutation'; updateCart: { __typename?: 'Cart'; id: string } };

export type GetCartCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetCartCountQuery = { __typename?: 'Query'; countCart: number };

export type GetProductCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductCategoriesQuery = {
  __typename?: 'Query';
  productCategories: Array<{
    __typename?: 'ProductCategory';
    id: string;
    name: string;
    title: string;
    type: CategoryType;
  }>;
};

export type CreateOrderMutationVariables = Exact<{
  fullName: Scalars['String']['input'];
  address: Scalars['String']['input'];
  cartIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  paymentProvider: PaymentProvider;
  phone: Scalars['String']['input'];
}>;

export type CreateOrderMutation = { __typename?: 'Mutation'; createOrder: string };

export type CheckoutOrderMutationVariables = Exact<{
  input: CheckoutOrderInput;
}>;

export type CheckoutOrderMutation = { __typename?: 'Mutation'; checkoutOrder: boolean };

export type GetHomeQueryVariables = Exact<{ [key: string]: never }>;

export type GetHomeQuery = {
  __typename?: 'Query';
  featuredProduct: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
  bestSellers: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
  newArrivals: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      rating: number;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
    }>;
  };
  topRatedProduct: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
  specialOffers: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      rating: number;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
    }>;
  };
};

export type GetMyPurchasesQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type GetMyPurchasesQuery = {
  __typename?: 'Query';
  searchOrder: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    orderItems: Array<{
      __typename?: 'OrderItem';
      id: string;
      userLab?: {
        __typename?: 'UserLab';
        isActive: boolean;
        id: string;
        updatedAt?: any | null;
        createdAt: any;
      } | null;
      product: {
        __typename?: 'Product';
        name: string;
        id: string;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
      };
      tickets: Array<{ __typename?: 'Ticket'; id: string }>;
    }>;
  }>;
};

export type GetUserLabsQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserLabsQuery = {
  __typename?: 'Query';
  userLabs: Array<{ __typename?: 'UserLab'; orderItem: { __typename?: 'OrderItem'; id: string } }>;
};

export type SearchOrderQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type SearchOrderQuery = {
  __typename?: 'Query';
  searchOrder: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    updatedAt?: any | null;
    totalPrice: number;
    status: OrderStatus;
    address: string;
    fullName: string;
    phone: string;
    shipTime?: any | null;
    payment: { __typename?: 'OrderPaymentEmbeddable'; provider: PaymentProvider; time?: any | null };
    orderItems: Array<{
      __typename?: 'OrderItem';
      hasLab: boolean;
      id: string;
      labPrice: number;
      productPrice: number;
      quantity: number;
      product: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
        lab?: { __typename?: 'ProductLab'; price: number } | null;
      };
    }>;
  }>;
};

export type GetOrderByStatusQueryVariables = Exact<{
  status: OrderStatus;
}>;

export type GetOrderByStatusQuery = {
  __typename?: 'Query';
  searchOrder: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    updatedAt?: any | null;
    totalPrice: number;
    status: OrderStatus;
    address: string;
    fullName: string;
    phone: string;
    shipTime?: any | null;
    payment: { __typename?: 'OrderPaymentEmbeddable'; provider: PaymentProvider; time?: any | null };
    orderItems: Array<{
      __typename?: 'OrderItem';
      hasLab: boolean;
      id: string;
      labPrice: number;
      productPrice: number;
      quantity: number;
      product: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
        lab?: { __typename?: 'ProductLab'; price: number } | null;
      };
    }>;
  }>;
};

export type GetOrderByToShipQueryVariables = Exact<{ [key: string]: never }>;

export type GetOrderByToShipQuery = {
  __typename?: 'Query';
  searchOrderByPaid: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    updatedAt?: any | null;
    totalPrice: number;
    status: OrderStatus;
    address: string;
    fullName: string;
    phone: string;
    shipTime?: any | null;
    payment: { __typename?: 'OrderPaymentEmbeddable'; provider: PaymentProvider; time?: any | null };
    orderItems: Array<{
      __typename?: 'OrderItem';
      hasLab: boolean;
      id: string;
      labPrice: number;
      productPrice: number;
      quantity: number;
      product: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
        lab?: { __typename?: 'ProductLab'; price: number } | null;
      };
    }>;
  }>;
  searchOrderByDelivering: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    updatedAt?: any | null;
    totalPrice: number;
    status: OrderStatus;
    address: string;
    fullName: string;
    phone: string;
    shipTime?: any | null;
    payment: { __typename?: 'OrderPaymentEmbeddable'; provider: PaymentProvider; time?: any | null };
    orderItems: Array<{
      __typename?: 'OrderItem';
      hasLab: boolean;
      id: string;
      labPrice: number;
      productPrice: number;
      quantity: number;
      product: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
        lab?: { __typename?: 'ProductLab'; price: number } | null;
      };
    }>;
  }>;
};

export type GetCountOrderQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountOrderQuery = {
  __typename?: 'Query';
  countOrder: {
    __typename?: 'CountOrderResponse';
    delivering: number;
    delivered: number;
    paid: number;
    rated: number;
    received: number;
    unpaid: number;
  };
};

export type GetHistoryOrderQueryVariables = Exact<{ [key: string]: never }>;

export type GetHistoryOrderQuery = {
  __typename?: 'Query';
  searchOrder: Array<{
    __typename?: 'Order';
    id: string;
    createdAt: any;
    updatedAt?: any | null;
    totalPrice: number;
    status: OrderStatus;
    address: string;
    fullName: string;
    phone: string;
    shipTime?: any | null;
    payment: { __typename?: 'OrderPaymentEmbeddable'; provider: PaymentProvider; time?: any | null };
    orderItems: Array<{
      __typename?: 'OrderItem';
      hasLab: boolean;
      id: string;
      labPrice: number;
      productPrice: number;
      quantity: number;
      product: {
        __typename?: 'Product';
        id: string;
        name: string;
        price: number;
        images: Array<{ __typename?: 'ProductImage'; url: string }>;
        lab?: { __typename?: 'ProductLab'; price: number } | null;
      };
    }>;
  }>;
};

export type RepayOrderMutationVariables = Exact<{
  orderId: Scalars['Float']['input'];
}>;

export type RepayOrderMutation = { __typename?: 'Mutation'; repayOrder: string };

export type ReceivedOrderMutationVariables = Exact<{
  orderId: Scalars['Float']['input'];
}>;

export type ReceivedOrderMutation = { __typename?: 'Mutation'; receiveOrder: { __typename?: 'Order'; id: string } };

export type ReOrderMutationVariables = Exact<{
  orderId: Scalars['Float']['input'];
}>;

export type ReOrderMutation = {
  __typename?: 'Mutation';
  reOrder: Array<{
    __typename?: 'Cart';
    id: string;
    hasLab: boolean;
    quantity: number;
    product: {
      __typename?: 'Product';
      id: string;
      name: string;
      price: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      lab?: { __typename?: 'ProductLab'; price: number } | null;
    };
  }>;
};

export type GetProductQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product: {
    __typename?: 'Product';
    description: string;
    id: string;
    name: string;
    price: number;
    rating: number;
    sold: number;
    categories: Array<{ __typename?: 'ProductCategory'; id: string; name: string; type: CategoryType; title: string }>;
    images: Array<{ __typename?: 'ProductImage'; id: string; url: string }>;
    feedbacks: Array<{
      __typename?: 'Feedback';
      note?: string | null;
      createdAt: any;
      id: string;
      rating: number;
      user: { __typename?: 'User'; fullName: string };
    }>;
    lab?: { __typename?: 'ProductLab'; price: number } | null;
  };
  products: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      price: number;
      name: string;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
};

export type GetFeaturedProductQueryVariables = Exact<{ [key: string]: never }>;

export type GetFeaturedProductQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      price: number;
      name: string;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
};

export type SearchProductByNameQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;

export type SearchProductByNameQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{ __typename?: 'Product'; id: string; name: string }>;
  };
};

export type FilterAndSortingProductQueryVariables = Exact<{
  categoryIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  currentItem: Scalars['Int']['input'];
  currentPage: Scalars['Int']['input'];
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  order: SortOrder;
  search: Scalars['String']['input'];
  sort: Scalars['String']['input'];
}>;

export type FilterAndSortingProductQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductsWithPaginationResponse';
    items: Array<{
      __typename?: 'Product';
      id: string;
      price: number;
      name: string;
      rating: number;
      images: Array<{ __typename?: 'ProductImage'; url: string }>;
      feedbacks: Array<{ __typename?: 'Feedback'; id: string }>;
    }>;
  };
};

export type GetMyTicketsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyTicketsQuery = {
  __typename?: 'Query';
  myTickets: Array<{
    __typename?: 'Ticket';
    id: string;
    createdAt: any;
    title: string;
    status: TicketStatus;
    senderComment: string;
    orderItem: {
      __typename?: 'OrderItem';
      id: string;
      product: { __typename?: 'Product'; name: string; images: Array<{ __typename?: 'ProductImage'; url: string }> };
    };
    category: { __typename?: 'TicketCategory'; name: string };
  }>;
};

export type GetTicketByIdQueryVariables = Exact<{
  ticketId: Scalars['Float']['input'];
}>;

export type GetTicketByIdQuery = {
  __typename?: 'Query';
  ticket: {
    __typename?: 'Ticket';
    id: string;
    createdAt: any;
    closedAt?: any | null;
    title: string;
    status: TicketStatus;
    senderComment: string;
    replierComment?: string | null;
    orderItem: {
      __typename?: 'OrderItem';
      id: string;
      product: { __typename?: 'Product'; name: string; images: Array<{ __typename?: 'ProductImage'; url: string }> };
    };
    category: { __typename?: 'TicketCategory'; name: string };
    replyImages: Array<{ __typename?: 'ReplyTicketImage'; id: string; url: string }>;
    images: Array<{ __typename?: 'TicketImage'; id: string; url: string }>;
  };
};

export type GetStaffTicketsByStatusQueryVariables = Exact<{
  status?: InputMaybe<TicketStatus>;
}>;

export type GetStaffTicketsByStatusQuery = {
  __typename?: 'Query';
  myTickets: Array<{
    __typename?: 'Ticket';
    id: string;
    createdAt: any;
    title: string;
    status: TicketStatus;
    senderComment: string;
    orderItem: {
      __typename?: 'OrderItem';
      id: string;
      product: { __typename?: 'Product'; name: string; images: Array<{ __typename?: 'ProductImage'; url: string }> };
    };
    category: { __typename?: 'TicketCategory'; name: string };
  }>;
};

export type ReplyTicketMutationVariables = Exact<{
  comment: Scalars['String']['input'];
  ticketId: Scalars['Float']['input'];
  images: Array<Scalars['File']['input']> | Scalars['File']['input'];
}>;

export type ReplyTicketMutation = { __typename?: 'Mutation'; replyTicket: { __typename?: 'Ticket'; id: string } };

export type GetCreateTicketQueryVariables = Exact<{ [key: string]: never }>;

export type GetCreateTicketQuery = {
  __typename?: 'Query';
  ticketCategorys: Array<{ __typename?: 'TicketCategory'; name: string; id: string }>;
  userLabs: Array<{
    __typename?: 'UserLab';
    orderItem: {
      __typename?: 'OrderItem';
      id: string;
      product: { __typename?: 'Product'; name: string; images: Array<{ __typename?: 'ProductImage'; url: string }> };
      tickets: Array<{ __typename?: 'Ticket'; id: string }>;
    };
  }>;
};

export type CreateTicketMutationVariables = Exact<{
  categoryId: Scalars['Float']['input'];
  comment: Scalars['String']['input'];
  orderItemId: Scalars['Float']['input'];
  title: Scalars['String']['input'];
}>;

export type CreateTicketMutation = { __typename?: 'Mutation'; createTicket: { __typename?: 'Ticket'; id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'AccessTokenResponse'; access_token: string };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'AccessTokenResponse'; access_token: string };
};

export type SendResetPasswordOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type SendResetPasswordOtpMutation = { __typename?: 'Mutation'; sendResetPasswordOTP: string };

export type GetTokenResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  OTPCode: Scalars['String']['input'];
}>;

export type GetTokenResetPasswordMutation = { __typename?: 'Mutation'; getTokenResetPassword: string };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation'; resetPassword: string };

export type LoginWithGoogleMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;

export type LoginWithGoogleMutation = {
  __typename?: 'Mutation';
  loginWithGoogle: { __typename?: 'AccessTokenResponse'; access_token: string };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'User';
    createdAt: any;
    email: string;
    fullName: string;
    id: string;
    phone?: string | null;
    role: Role;
    status: UserStatus;
    updatedAt?: any | null;
    address?: string | null;
  };
};

export type UpdateMeMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateMeMutation = { __typename?: 'Mutation'; updateUser: { __typename?: 'User'; id: string } };

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

export const AddToCartDocument = new TypedDocumentString(`
    mutation AddToCart($hasLab: Boolean!, $productId: Float!, $quantity: Float!) {
  addToCart(hasLab: $hasLab, productId: $productId, quantity: $quantity) {
    id
  }
}
    `) as unknown as TypedDocumentString<AddToCartMutation, AddToCartMutationVariables>;
export const GetCartDocument = new TypedDocumentString(`
    query GetCart {
  carts {
    id
    hasLab
    product {
      id
      name
      price
      images {
        url
      }
      lab {
        price
      }
    }
    quantity
  }
}
    `) as unknown as TypedDocumentString<GetCartQuery, GetCartQueryVariables>;
export const DeleteCartsDocument = new TypedDocumentString(`
    mutation DeleteCarts($cartId: [Int!]!) {
  deleteCarts(cartId: $cartId)
}
    `) as unknown as TypedDocumentString<DeleteCartsMutation, DeleteCartsMutationVariables>;
export const UpdateCartDocument = new TypedDocumentString(`
    mutation UpdateCart($cartId: Float!, $quantity: Float!) {
  updateCart(cartId: $cartId, quantity: $quantity) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateCartMutation, UpdateCartMutationVariables>;
export const GetCartCountDocument = new TypedDocumentString(`
    query GetCartCount {
  countCart
}
    `) as unknown as TypedDocumentString<GetCartCountQuery, GetCartCountQueryVariables>;
export const GetProductCategoriesDocument = new TypedDocumentString(`
    query GetProductCategories {
  productCategories {
    id
    name
    title
    type
  }
}
    `) as unknown as TypedDocumentString<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const CreateOrderDocument = new TypedDocumentString(`
    mutation CreateOrder($fullName: String!, $address: String!, $cartIds: [Int!]!, $paymentProvider: PaymentProvider!, $phone: String!) {
  createOrder(
    fullName: $fullName
    address: $address
    cartIds: $cartIds
    paymentProvider: $paymentProvider
    phone: $phone
  )
}
    `) as unknown as TypedDocumentString<CreateOrderMutation, CreateOrderMutationVariables>;
export const CheckoutOrderDocument = new TypedDocumentString(`
    mutation CheckoutOrder($input: CheckoutOrderInput!) {
  checkoutOrder(input: $input)
}
    `) as unknown as TypedDocumentString<CheckoutOrderMutation, CheckoutOrderMutationVariables>;
export const GetHomeDocument = new TypedDocumentString(`
    query GetHome {
  featuredProduct: products(currentItem: 10, order: DESC, sort: "rating") {
    items {
      id
      images {
        url
      }
      name
      price
      rating
      feedbacks {
        id
      }
    }
  }
  bestSellers: products(currentItem: 10, order: DESC, sort: "sold") {
    items {
      id
      images {
        url
      }
      name
      price
      rating
      feedbacks {
        id
      }
    }
  }
  newArrivals: products(currentItem: 10, order: DESC, sort: "createdAt") {
    items {
      id
      feedbacks {
        id
      }
      images {
        url
      }
      name
      price
      rating
    }
  }
  topRatedProduct: products(currentItem: 10, order: DESC, sort: "rating") {
    items {
      id
      images {
        url
      }
      name
      price
      rating
      feedbacks {
        id
      }
    }
  }
  specialOffers: products(order: ASC, sort: "price", currentItem: 10) {
    items {
      id
      feedbacks {
        id
      }
      images {
        url
      }
      name
      price
      rating
    }
  }
}
    `) as unknown as TypedDocumentString<GetHomeQuery, GetHomeQueryVariables>;
export const GetMyPurchasesDocument = new TypedDocumentString(`
    query GetMyPurchases($search: String!) {
  searchOrder(search: $search) {
    orderItems {
      userLab {
        isActive
        id
        updatedAt
        createdAt
      }
      product {
        name
        images {
          url
        }
        id
      }
      tickets {
        id
      }
      id
    }
    id
    createdAt
  }
}
    `) as unknown as TypedDocumentString<GetMyPurchasesQuery, GetMyPurchasesQueryVariables>;
export const GetUserLabsDocument = new TypedDocumentString(`
    query GetUserLabs {
  userLabs {
    orderItem {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetUserLabsQuery, GetUserLabsQueryVariables>;
export const SearchOrderDocument = new TypedDocumentString(`
    query SearchOrder($search: String!) {
  searchOrder(search: $search) {
    id
    createdAt
    updatedAt
    totalPrice
    status
    address
    fullName
    phone
    shipTime
    payment {
      provider
      time
    }
    orderItems {
      hasLab
      id
      labPrice
      productPrice
      quantity
      product {
        id
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SearchOrderQuery, SearchOrderQueryVariables>;
export const GetOrderByStatusDocument = new TypedDocumentString(`
    query GetOrderByStatus($status: OrderStatus!) {
  searchOrder(search: "", status: $status) {
    id
    createdAt
    updatedAt
    totalPrice
    status
    address
    fullName
    phone
    shipTime
    payment {
      provider
      time
    }
    orderItems {
      hasLab
      id
      labPrice
      productPrice
      quantity
      product {
        id
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetOrderByStatusQuery, GetOrderByStatusQueryVariables>;
export const GetOrderByToShipDocument = new TypedDocumentString(`
    query GetOrderByToShip {
  searchOrderByPaid: searchOrder(search: "", status: PAID) {
    id
    createdAt
    updatedAt
    totalPrice
    status
    address
    fullName
    phone
    shipTime
    payment {
      provider
      time
    }
    orderItems {
      hasLab
      id
      labPrice
      productPrice
      quantity
      product {
        id
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
    }
  }
  searchOrderByDelivering: searchOrder(search: "", status: DELIVERING) {
    id
    createdAt
    updatedAt
    totalPrice
    status
    address
    fullName
    phone
    shipTime
    payment {
      provider
      time
    }
    orderItems {
      hasLab
      id
      labPrice
      productPrice
      quantity
      product {
        id
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetOrderByToShipQuery, GetOrderByToShipQueryVariables>;
export const GetCountOrderDocument = new TypedDocumentString(`
    query GetCountOrder {
  countOrder {
    delivering
    delivered
    paid
    rated
    received
    unpaid
  }
}
    `) as unknown as TypedDocumentString<GetCountOrderQuery, GetCountOrderQueryVariables>;
export const GetHistoryOrderDocument = new TypedDocumentString(`
    query GetHistoryOrder {
  searchOrder(search: "") {
    id
    createdAt
    updatedAt
    totalPrice
    status
    address
    fullName
    phone
    shipTime
    payment {
      provider
      time
    }
    orderItems {
      hasLab
      id
      labPrice
      productPrice
      quantity
      product {
        id
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetHistoryOrderQuery, GetHistoryOrderQueryVariables>;
export const RepayOrderDocument = new TypedDocumentString(`
    mutation RepayOrder($orderId: Float!) {
  repayOrder(orderId: $orderId)
}
    `) as unknown as TypedDocumentString<RepayOrderMutation, RepayOrderMutationVariables>;
export const ReceivedOrderDocument = new TypedDocumentString(`
    mutation ReceivedOrder($orderId: Float!) {
  receiveOrder(orderId: $orderId) {
    id
  }
}
    `) as unknown as TypedDocumentString<ReceivedOrderMutation, ReceivedOrderMutationVariables>;
export const ReOrderDocument = new TypedDocumentString(`
    mutation ReOrder($orderId: Float!) {
  reOrder(orderId: $orderId) {
    id
    hasLab
    product {
      id
      name
      price
      images {
        url
      }
      lab {
        price
      }
    }
    quantity
  }
}
    `) as unknown as TypedDocumentString<ReOrderMutation, ReOrderMutationVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: Float!) {
  product(id: $id) {
    categories {
      id
      name
      type
      title
    }
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
      note
      createdAt
      id
      rating
      user {
        fullName
      }
    }
    lab {
      price
    }
  }
  products(currentItem: 10, order: ASC, sort: "price") {
    items {
      id
      images {
        url
      }
      price
      name
      rating
      feedbacks {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const GetFeaturedProductDocument = new TypedDocumentString(`
    query GetFeaturedProduct {
  products(currentItem: 10, order: ASC, sort: "price") {
    items {
      id
      images {
        url
      }
      price
      name
      rating
      feedbacks {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetFeaturedProductQuery, GetFeaturedProductQueryVariables>;
export const SearchProductByNameDocument = new TypedDocumentString(`
    query SearchProductByName($search: String!) {
  products(search: $search) {
    items {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<SearchProductByNameQuery, SearchProductByNameQueryVariables>;
export const FilterAndSortingProductDocument = new TypedDocumentString(`
    query FilterAndSortingProduct($categoryIds: [Int!]!, $currentItem: Int!, $currentPage: Int!, $maxPrice: Int, $maxRating: Int, $minPrice: Int, $minRating: Int, $order: SortOrder!, $search: String!, $sort: String!) {
  products(
    categoryIds: $categoryIds
    currentItem: $currentItem
    currentPage: $currentPage
    maxPrice: $maxPrice
    maxRating: $maxRating
    minPrice: $minPrice
    minRating: $minRating
    order: $order
    search: $search
    sort: $sort
  ) {
    items {
      id
      images {
        url
      }
      price
      name
      rating
      feedbacks {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<FilterAndSortingProductQuery, FilterAndSortingProductQueryVariables>;
export const GetMyTicketsDocument = new TypedDocumentString(`
    query GetMyTickets {
  myTickets {
    id
    createdAt
    title
    status
    senderComment
    orderItem {
      id
      product {
        name
        images {
          url
        }
      }
    }
    category {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<GetMyTicketsQuery, GetMyTicketsQueryVariables>;
export const GetTicketByIdDocument = new TypedDocumentString(`
    query GetTicketById($ticketId: Float!) {
  ticket(ticketId: $ticketId) {
    id
    createdAt
    closedAt
    title
    status
    senderComment
    replierComment
    orderItem {
      id
      product {
        name
        images {
          url
        }
      }
    }
    category {
      name
    }
    replyImages {
      id
      url
    }
    images {
      id
      url
    }
  }
}
    `) as unknown as TypedDocumentString<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const GetStaffTicketsByStatusDocument = new TypedDocumentString(`
    query GetStaffTicketsByStatus($status: TicketStatus) {
  myTickets(status: $status) {
    id
    createdAt
    title
    status
    senderComment
    orderItem {
      id
      product {
        name
        images {
          url
        }
      }
    }
    category {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<GetStaffTicketsByStatusQuery, GetStaffTicketsByStatusQueryVariables>;
export const ReplyTicketDocument = new TypedDocumentString(`
    mutation ReplyTicket($comment: String!, $ticketId: Float!, $images: [File!]!) {
  replyTicket(comment: $comment, ticketId: $ticketId, images: $images) {
    id
  }
}
    `) as unknown as TypedDocumentString<ReplyTicketMutation, ReplyTicketMutationVariables>;
export const GetCreateTicketDocument = new TypedDocumentString(`
    query GetCreateTicket {
  ticketCategorys {
    name
    id
  }
  userLabs {
    orderItem {
      id
      product {
        name
        images {
          url
        }
      }
      tickets {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCreateTicketQuery, GetCreateTicketQueryVariables>;
export const CreateTicketDocument = new TypedDocumentString(`
    mutation CreateTicket($categoryId: Float!, $comment: String!, $orderItemId: Float!, $title: String!) {
  createTicket(
    categoryId: $categoryId
    comment: $comment
    orderItemId: $orderItemId
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateTicketMutation, CreateTicketMutationVariables>;
export const LoginDocument = new TypedDocumentString(`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = new TypedDocumentString(`
    mutation Register($email: String!, $fullName: String!, $password: String!, $phone: String!) {
  register(email: $email, fullName: $fullName, password: $password, phone: $phone) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const SendResetPasswordOtpDocument = new TypedDocumentString(`
    mutation SendResetPasswordOTP($email: String!) {
  sendResetPasswordOTP(email: $email)
}
    `) as unknown as TypedDocumentString<SendResetPasswordOtpMutation, SendResetPasswordOtpMutationVariables>;
export const GetTokenResetPasswordDocument = new TypedDocumentString(`
    mutation GetTokenResetPassword($email: String!, $OTPCode: String!) {
  getTokenResetPassword(email: $email, OTPCode: $OTPCode)
}
    `) as unknown as TypedDocumentString<GetTokenResetPasswordMutation, GetTokenResetPasswordMutationVariables>;
export const ResetPasswordDocument = new TypedDocumentString(`
    mutation ResetPassword($password: String!, $token: String!) {
  resetPassword(password: $password, token: $token)
}
    `) as unknown as TypedDocumentString<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LoginWithGoogleDocument = new TypedDocumentString(`
    mutation LoginWithGoogle($code: String!) {
  loginWithGoogle(code: $code) {
    access_token
  }
}
    `) as unknown as TypedDocumentString<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    createdAt
    email
    fullName
    id
    phone
    role
    status
    updatedAt
    address
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const UpdateMeDocument = new TypedDocumentString(`
    mutation UpdateMe($address: String, $email: String, $fullName: String, $phone: String) {
  updateUser(address: $address, email: $email, fullName: $fullName, phone: $phone) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateMeMutation, UpdateMeMutationVariables>;
