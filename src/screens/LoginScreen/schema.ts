import { z } from 'zod';

const schema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export type LoginFormType = z.infer<typeof schema>;

export default schema;
