import { graphql } from '~graphql';

export const GetMyTicketsQuery = graphql(`
  query GetMyTickets {
    myTickets {
      id
      createdAt
      closedAt
      title
      status
      senderComment
      replierComment
      orderItem {
        id
        product {
          name
          images {
            url
          }
        }
      }
      category {
        name
      }
      replyImages {
        url
      }
      images {
        url
      }
    }
  }
`);
