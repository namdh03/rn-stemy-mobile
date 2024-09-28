import { graphql } from '~graphql';

export const GetProductQuery = graphql(`
  query GetProduct($id: Float!) {
    product(id: $id) {
      categories {
        name
      }
      images {
        id
        url
      }
      description
      id
      name
      price
      rating
      sold
      feedbacks {
        comment
        createdAt
        id
        rating
        user {
          fullName
        }
      }
      lab {
        price
      }
    }
    products(currentItem: 10, order: ASC, sort: "price") {
      items {
        id
        images {
          url
        }
        price
        name
        rating
        feedbacks {
          id
        }
      }
    }
  }
`);
