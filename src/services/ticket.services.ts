import { graphql } from '~graphql';

export const GetMyTicketsQuery = graphql(`
  query GetMyTickets {
    myTickets {
      id
      createdAt
      title
      status
      senderComment
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
    }
  }
`);

export const GetTicketByIdQuery = graphql(`
  query GetTicketById($ticketId: Float!) {
    ticket(ticketId: $ticketId) {
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
        id
        url
      }
      images {
        id
        url
      }
    }
  }
`);

export const GetStaffTicketsByStatusQuery = graphql(`
  query GetStaffTicketsByStatus($status: TicketStatus) {
    myTickets(status: $status) {
      id
      createdAt
      title
      status
      senderComment
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
    }
  }
`);
