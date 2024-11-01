import { GetProductQuery } from '~graphql/graphql';

export type ProductDetailState = {
  rating: number;
  feedbacks: GetProductQuery['product']['feedbacks'];
};

export type ProductDetailActions = {
  setFeedbacks: (rating: number, feedbacks: GetProductQuery['product']['feedbacks']) => void;
  resetProductDetail: () => void;
};

export type ProductDetailSlice = ProductDetailState & ProductDetailActions;
