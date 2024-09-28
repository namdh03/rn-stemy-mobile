import { z } from 'zod';

import constants from '~constants';

// GLOBAL SCHEMA
export const fullNameSchema = z.string().min(1, {
  message: constants.MESSAGES.AUTH_MESSAGES.FULL_NAME_VALIDATE,
});

export const phoneSchema = z.string().refine((value) => constants.REGEX.PHONE_REGEX.test(value), {
  message: constants.MESSAGES.AUTH_MESSAGES.PHONE_VALIDATE,
});

export const emailSchema = z.string().email({
  message: constants.MESSAGES.AUTH_MESSAGES.EMAIL_VALIDATE,
});

export const passwordSchema = z.string().min(8, {
  message: constants.MESSAGES.AUTH_MESSAGES.PASSWORD_VALIDATE,
});

export const addressSchema = z
  .string()
  .min(1, {
    message: constants.MESSAGES.AUTH_MESSAGES.ADDRESS_MIN_VALIDATE,
  })
  .max(255, {
    message: constants.MESSAGES.AUTH_MESSAGES.ADDRESS_MAX_VALIDATE,
  });
