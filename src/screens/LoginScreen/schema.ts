import { z } from 'zod';

import constants from '~constants';

const schema = z.object({
  email: z.string().email({
    message: constants.MESSAGES.AUTH_MESSAGES.EMAIL_VALIDATE,
  }),
  password: z.string().min(8, {
    message: constants.MESSAGES.AUTH_MESSAGES.PASSWORD_VALIDATE,
  }),
});

export type LoginFormType = z.infer<typeof schema>;

export default schema;
