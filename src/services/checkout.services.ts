import { graphql } from '~graphql';

export const CreateOrderMutation = graphql(`
  mutation CreateOrder(
    $fullName: String!
    $address: String!
    $cartIds: [Int!]!
    $paymentProvider: PaymentProvider!
    $phone: String!
  ) {
    createOrder(
      fullName: $fullName
      address: $address
      cartIds: $cartIds
      paymentProvider: $paymentProvider
      phone: $phone
    )
  }
`);

export const CheckoutOrderMutation = graphql(`
  mutation CheckoutOrder($input: CheckoutOrderInput!) {
    checkoutOrder(input: $input)
  }
`);
