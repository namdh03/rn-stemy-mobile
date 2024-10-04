import { graphql } from '~graphql';

export const GetProductCategoriesQuery = graphql(`
  query GetProductCategories {
    productCategories {
      id
      name
      title
      type
    }
  }
`);
