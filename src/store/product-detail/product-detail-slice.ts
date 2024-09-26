import { StateCreator } from 'zustand';

import { ProductFeedbackType } from '~types/feedback.type';

import { ProductDetailSlice, ProductDetailState } from './product-detail.type';

const initialState: ProductDetailState = {
  rating: 0,
  feedbacks: [],
};

export const createProductDetailSlice: StateCreator<
  ProductDetailSlice,
  [['zustand/immer', never]],
  [],
  ProductDetailSlice
> = (set) => ({
  ...initialState,
  setFeedbacks: (rating: number, feedbacks: ProductFeedbackType[]) =>
    set((state) => {
      state.rating = rating;
      state.feedbacks = feedbacks;
    }),
  reset: () => set(initialState),
});
