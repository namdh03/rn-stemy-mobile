import { graphql } from '~graphql';

export const AddToCartMutation = graphql(`
  mutation AddToCart($hasLab: Boolean!, $productId: Float!, $quantity: Float!) {
    addToCart(hasLab: $hasLab, productId: $productId, quantity: $quantity) {
      id
    }
  }
`);

export const GetCartQuery = graphql(`
  query GetCart {
    carts {
      id
      hasLab
      product {
        name
        price
        images {
          url
        }
        lab {
          price
        }
      }
      quantity
    }
  }
`);

export const DeleteCartsMutation = graphql(`
  mutation DeleteCarts($cartId: [Int!]!) {
    deleteCarts(cartId: $cartId)
  }
`);

export const UpdateCartMutation = graphql(`
  mutation UpdateCart($cartId: Float!, $quantity: Float!) {
    updateCart(cartId: $cartId, quantity: $quantity) {
      id
    }
  }
`);
