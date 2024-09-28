import { PaymentProvider } from '~graphql/graphql';

export interface CheckoutData {
  phone?: string | null;
  address?: string | null;
  cartIds: number[];
  paymentProvider: PaymentProvider;
}

export interface CheckoutDataStrict {
  phone: string;
  address: string;
  cartIds: number[];
  paymentProvider: PaymentProvider;
}

export interface CheckoutSlice {
  checkoutData: CheckoutData;
  setCheckoutData: (data: Partial<CheckoutData>) => void;
  reset: () => void;
}
