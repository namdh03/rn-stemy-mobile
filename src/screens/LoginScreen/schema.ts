import { z } from 'zod';

import { emailSchema, passwordSchema } from '~utils/schema';

const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormType = z.infer<typeof schema>;

export default schema;
