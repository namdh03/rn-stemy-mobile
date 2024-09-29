import { graphql } from '~graphql';

export const GetRateQuery = graphql(`
  query GetRated {
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
  }
`);

export const GetSoldQuery = graphql(`
  query GetSold {
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
  }
`);

export const GetCreatedAtQuery = graphql(`
  query GetCreatedAt {
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
  }
`);

export const GetPriceQuery = graphql(`
  query GetPrice {
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

