import { graphql } from '~graphql';

export const CreateOrderMutation = graphql(`
  mutation CreateOrder($address: String!, $cartIds: [Int!]!, $paymentProvider: PaymentProvider!, $phone: String!) {
    createOrder(address: $address, cartIds: $cartIds, paymentProvider: $paymentProvider, phone: $phone)
  }
`);

export const CheckoutOrderMutation = graphql(`
  mutation CheckoutOrder($input: CheckoutOrderInput!) {
    checkoutOrder(input: $input)
  }
`);
