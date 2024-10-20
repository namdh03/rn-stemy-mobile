import { graphql } from '~graphql';

export const GetMyTicketsQuery = graphql(`
  query GetMyTickets {
    myTickets {
      id
      createdAt
      updatedAt
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
      updatedAt
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

export const ReplyTicketMutation = graphql(`
  mutation ReplyTicket($comment: String!, $ticketId: Float!, $images: [File!]!) {
    replyTicket(comment: $comment, ticketId: $ticketId, images: $images) {
      id
    }
  }
`);

export const GetCreateTicketQuery = graphql(`
  query GetCreateTicket {
    ticketCategorys {
      name
      id
    }
    userLabs {
      orderItem {
        id
        createdAt
        product {
          name
          images {
            url
          }
        }
        tickets {
          id
        }
      }
    }
  }
`);

export const CreateTicketMutation = graphql(`
  mutation CreateTicket(
    $categoryId: Float!
    $comment: String!
    $orderItemId: Float!
    $title: String!
    $images: [File!]!
  ) {
    createTicket(
      categoryId: $categoryId
      comment: $comment
      orderItemId: $orderItemId
      title: $title
      images: $images
    ) {
      id
    }
  }
`);
