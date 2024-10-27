import * as FileSystem from 'expo-file-system';
import { z } from 'zod';

import constants from '~constants';

const MAX_IMAGE_SIZE_MB = 1;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const ImageFileSchema = z.object({
  uri: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
});

export const createTicketSchema = z.object({
  orderItemId: z.coerce
    .number({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.ORDER_ITEM_ID,
    })
    .int({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.ORDER_ITEM_ID,
    })
    .positive({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.ORDER_ITEM_ID,
    })
    .min(1, {
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.ORDER_ITEM_ID,
    }),
  categoryId: z.coerce
    .number({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.CATEGORY_ID,
    })
    .int({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.CATEGORY_ID,
    })
    .positive({
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.CATEGORY_ID,
    })
    .min(1, {
      message: constants.MESSAGES.STAFF_TICKET_MESSAGES.CATEGORY_ID,
    }),
  title: z.string().min(1, {
    message: constants.MESSAGES.STAFF_TICKET_MESSAGES.TITLE_VALIDATE,
  }),
  description: z.string().min(1, {
    message: constants.MESSAGES.STAFF_TICKET_MESSAGES.DESCRIPTION_VALIDATE,
  }),
  images: z.array(ImageFileSchema).refine(
    async (images) => {
      for (const image of images) {
        const info = await FileSystem.getInfoAsync(image.uri);
        if (!info.exists || info.size > MAX_IMAGE_SIZE) {
          return false;
        }
      }
      return true;
    },
    {
      message: `Each image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`,
    },
  ),
});

export type CreateTicketFormType = z.infer<typeof createTicketSchema>;
