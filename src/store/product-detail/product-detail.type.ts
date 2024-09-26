import { ProductFeedbackType } from '~types/feedback.type';

export type ProductDetailState = {
  rating: number;
  feedbacks: ProductFeedbackType[];
};

export type ProductDetailActions = {
  setFeedbacks: (rating: number, feedbacks: ProductFeedbackType[]) => void;
  reset: () => void;
};

export type ProductDetailSlice = ProductDetailState & ProductDetailActions;
