import { PaymentProvider } from '~graphql/graphql';

export interface CheckoutData {
  fullName?: string | null;
  phone?: string | null;
  address?: string | null;
  cartIds: number[];
  paymentProvider?: PaymentProvider;
}

export interface CheckoutDataStrict {
  fullName: string;
  phone: string;
  address: string;
  cartIds: number[];
  paymentProvider: PaymentProvider;
}

export interface CheckoutSlice {
  checkoutData: CheckoutData;
  setCheckoutData: (data: Partial<CheckoutData>) => void;
  resetCheckout: () => void;
}
