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

export const GetOrderByToShipQuery = graphql(`
  query GetOrderByToShip {
    searchOrderByPaid: searchOrder(search: "", status: PAID) {
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
    searchOrderByDelivering: searchOrder(search: "", status: DELIVERING) {
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

export const GetCountOrderQuery = graphql(`
  query GetCountOrder {
    countOrder {
      delivering
      delivered
      paid
      rated
      received
      unpaid
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

export const ReOrderMutation = graphql(`
  mutation ReOrder($orderId: Float!) {
    reOrder(orderId: $orderId) {
      id
      hasLab
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
      quantity
    }
  }
`);

export const GetStaffListOrderQuery = graphql(`
  query GetStaffListOrder($status: OrderStatus!) {
    listOrders(status: $status) {
      address
      createdAt
      fullName
      id
      orderItems {
        id
      }
      phone
      totalPrice
      updatedAt
    }
  }
`);
