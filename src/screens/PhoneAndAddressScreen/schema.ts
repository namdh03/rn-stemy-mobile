import { z } from 'zod';

import { addressSchema, phoneSchema } from '~utils/schema';

const schema = z.object({
  phone: phoneSchema,
  address: addressSchema,
});

export type PhoneAndAddressFormType = z.infer<typeof schema>;

export default schema;
