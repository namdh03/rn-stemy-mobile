import { graphql } from '~graphql';

export const GetProduct = graphql(`
  query GetProductQuery($id: Float!) {
    product(id: $id) {
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
    }
  }
`);
