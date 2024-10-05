import { graphql } from '~graphql';

export const SearchOrderQuery = graphql(`
  query SearchOrder($search: String!) {
    searchOrder(search: $search) {
      id
      createdAt
      updatedAt
      totalPrice
      status
      orderItems {
        hasLab
        id
        labPrice
        productPrice
        quantity
        product {
          name
          images {
            url
          }
        }
      }
    }
  }
`);

export const GetOrderByStatusQuery = graphql(`
  query GetOrderByStatus($status: OrderStatus!) {
    searchOrder(search: "", status: $status) {
      id
      createdAt
      updatedAt
      totalPrice
      status
      orderItems {
        hasLab
        id
        labPrice
        productPrice
        quantity
        product {
          name
          images {
            url
          }
        }
      }
    }
  }
`);

export const RepayOrderMutation = graphql(`
  mutation RepayOrder($orderId: Float!) {
    repayOrder(orderId: $orderId)
  }
`);
