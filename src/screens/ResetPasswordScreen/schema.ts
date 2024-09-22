import { z } from 'zod';

import constants from '~constants';
import { passwordSchema } from '~utils/schema';

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: constants.MESSAGES.AUTH_MESSAGES.CONFIRM_PASSWORD_VALIDATE,
      path: ['confirmPassword'],
    },
  );

export type ResetPasswordFormType = z.infer<typeof schema>;

export default schema;
