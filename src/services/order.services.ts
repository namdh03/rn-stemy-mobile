import { graphql } from '~graphql';

export const SearchOrderQuery = graphql(`
  query SearchOrder($search: String!) {
    searchOrder(search: $search) {
      id
      createdAt
      updatedAt
      totalPrice
      status
      address
      fullName
      phone
      shipTime
      payment {
        provider
        time
      }
      orderItems {
        hasLab
        id
        labPrice
        productPrice
        quantity
        product {
          id
          name
          price
          images {
            url
          }
          lab {
            price
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
      address
      fullName
      phone
      shipTime
      payment {
        provider
        time
      }
      orderItems {
        hasLab
        id
        labPrice
        productPrice
        quantity
        product {
          id
          name
          price
          images {
            url
          }
          lab {
            price
          }
        }
      }
    }
  }
`);

export const GetHistoryOrderQuery = graphql(`
  query GetHistoryOrder {
    searchOrder(search: "") {
      id
      createdAt
      updatedAt
      totalPrice
      status
      address
      fullName
      phone
      shipTime
      payment {
        provider
        time
      }
      orderItems {
        hasLab
        id
        labPrice
        productPrice
        quantity
        product {
          id
          name
          price
          images {
            url
          }
          lab {
            price
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

export const ReceivedOrderMutation = graphql(`
  mutation ReceivedOrder($orderId: Float!) {
    receiveOrder(orderId: $orderId) {
      id
    }
  }
`);
