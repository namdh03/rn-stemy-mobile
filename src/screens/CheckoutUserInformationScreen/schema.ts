import { z } from 'zod';

import { addressSchema, fullNameSchema, phoneSchema } from '~utils/schema';

const schema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  address: addressSchema,
});

export type CheckoutUserInformationFormType = z.infer<typeof schema>;

export default schema;
