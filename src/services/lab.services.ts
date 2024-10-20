import { graphql } from '~graphql';
import http from '~utils/http';

export const GetMyPurchasesQuery = graphql(`
  query GetMyPurchases($search: String!) {
    searchOrder(search: $search) {
      orderItems {
        userLab {
          isActive
          id
          updatedAt
          createdAt
        }
        product {
          name
          images {
            url
          }
          id
        }
        tickets {
          id
        }
        id
      }
      id
      createdAt
      updatedAt
    }
  }
`);

export const downloadFilePFD = (id: string) => http.get(`/download/${id}`);

export const GetUserLabsQuery = graphql(`
  query GetUserLabs {
    userLabs {
      orderItem {
        id
      }
    }
  }
`);
