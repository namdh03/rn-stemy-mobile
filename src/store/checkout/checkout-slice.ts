import { StateCreator } from 'zustand';

import { CheckoutData, CheckoutSlice } from './checkout.type';

const initialCheckoutData: CheckoutData = {
  fullName: undefined,
  phone: undefined,
  address: undefined,
  cartIds: [],
  paymentProvider: undefined,
} as const;

export const createCheckoutSlice: StateCreator<CheckoutSlice, [['zustand/immer', never]], [], CheckoutSlice> = (
  set,
) => ({
  checkoutData: initialCheckoutData,
  setCheckoutData: (newData) =>
    set((state) => ({
      checkoutData: { ...state.checkoutData, ...newData },
    })),
  reset: () => set({ checkoutData: initialCheckoutData }),
});
