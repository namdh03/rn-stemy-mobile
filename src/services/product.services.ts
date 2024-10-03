import { graphql } from '~graphql';

export const GetProductQuery = graphql(`
  query GetProduct($id: Float!) {
    product(id: $id) {
      categories {
        id
        name
        type
        title
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
        note
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

export const GetFeaturedProductQuery = graphql(`
  query GetFeaturedProduct {
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

export const SearchProductByNameQuery = graphql(`
  query SearchProductByName($search: String!) {
    products(search: $search) {
      items {
        id
        name
      }
    }
  }
`);

export const FilterAndSortingProductQuery = graphql(`
  query FilterAndSortingProduct(
    $categoryIds: [Int!]!
    $currentItem: Int!
    $currentPage: Int!
    $maxPrice: Int
    $maxRating: Int
    $minPrice: Int
    $minRating: Int
    $order: SortOrder!
    $search: String!
    $sort: String!
  ) {
    products(
      categoryIds: $categoryIds
      currentItem: $currentItem
      currentPage: $currentPage
      maxPrice: $maxPrice
      maxRating: $maxRating
      minPrice: $minPrice
      minRating: $minRating
      order: $order
      search: $search
      sort: $sort
    ) {
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
