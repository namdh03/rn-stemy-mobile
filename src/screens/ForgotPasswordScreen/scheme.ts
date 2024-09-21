import { z } from 'zod';

import { emailSchema } from '~utils/schema';

const schema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormType = z.infer<typeof schema>;

export default schema;
