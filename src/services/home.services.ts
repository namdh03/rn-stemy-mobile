import { graphql } from '~graphql';

export const GetHomeQuery = graphql(`
  query GetHome {
    featuredProduct: products(currentItem: 10, order: DESC, sort: "rating") {
      items {
        id
        images {
          url
        }
        name
        price
        rating
        feedbacks {
          id
        }
      }
    }

    bestSellers: products(currentItem: 10, order: DESC, sort: "sold") {
      items {
        id
        images {
          url
        }
        name
        price
        rating
        feedbacks {
          id
        }
      }
    }

    newArrivals: products(currentItem: 10, order: DESC, sort: "createdAt") {
      items {
        id
        feedbacks {
          id
        }
        images {
          url
        }
        name
        price
        rating
      }
    }

    topRatedProduct: products(currentItem: 10, order: DESC, sort: "rating") {
      items {
        id
        images {
          url
        }
        name
        price
        rating
        feedbacks {
          id
        }
      }
    }

    specialOffers: products(order: ASC, sort: "price", currentItem: 10) {
      items {
        id
        feedbacks {
          id
        }
        images {
          url
        }
        name
        price
        rating
      }
    }
  }
`);
