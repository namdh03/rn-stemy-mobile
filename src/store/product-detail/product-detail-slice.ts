import { StateCreator } from 'zustand';

import { GetProductQuery } from '~graphql/graphql';

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
  setFeedbacks: (rating: number, feedbacks: GetProductQuery['product']['feedbacks']) =>
    set((state) => {
      state.rating = rating;
      state.feedbacks = feedbacks;
    }),
  reset: () => set(initialState),
});
