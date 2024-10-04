import { z } from 'zod';

const schema = z.object({
  priceRange: z.array(z.number()),
  rating: z.number(),
  categoryIds: z.array(z.number()),
});

export type CategoriesFormType = z.infer<typeof schema>;

export default schema;
