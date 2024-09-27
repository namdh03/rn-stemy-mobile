import { graphql } from '~graphql';

export const AddToCartMutation = graphql(`
  mutation AddToCart($productId: Float!, $quantity: Float!) {
    addToCart(productId: $productId, quantity: $quantity) {
      id
    }
  }
`);

export const GetCartQuery = graphql(`
  query GetCart {
    carts {
      id
      quantity
      product {
        name
        price
        images {
          url
        }
      }
    }
  }
`);
