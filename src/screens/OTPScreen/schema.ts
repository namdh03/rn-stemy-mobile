import { z } from 'zod';

import constants from '~constants';

const schema = z.object({
  OTPCode: z.string().length(4, {
    message: constants.MESSAGES.AUTH_MESSAGES.OTP_CODE_VALIDATE,
  }),
});

export type OTPFormType = z.infer<typeof schema>;

export default schema;
