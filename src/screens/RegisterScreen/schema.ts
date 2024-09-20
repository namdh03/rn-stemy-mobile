import { z } from 'zod';

import { emailSchema, fullNameSchema, passwordSchema, phoneSchema } from '~utils/schema';

const schema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormType = z.infer<typeof schema>;

export default schema;
