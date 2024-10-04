import { z } from 'zod';

import { SortOrder } from '~graphql/graphql';

const schema = z.object({
  priceRange: z.array(z.number()),
  rating: z.number(),
  categoryIds: z.array(z.number()),
  order: z.enum([SortOrder.Asc, SortOrder.Desc]),
  sort: z.enum(['name', 'price', 'id']).optional().default('id'),
});

export type CategoriesFormType = z.infer<typeof schema>;

export default schema;
