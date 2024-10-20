import { useMutation } from '@tanstack/react-query';

import { executeWithFormData } from '~graphql/execute';
import { CreateTicketFormType } from '~screens/CreateTicketScreen/schema';
import { CreateTicketMutation } from '~services/ticket.services';

const useCreateTicket = () => {
  return useMutation({
    mutationFn: async ({ images, description, categoryId, orderItemId, title }: CreateTicketFormType) => {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: CreateTicketMutation,
          variables: {
            categoryId,
            orderItemId,
            title,
            comment: description,
            images: images.map(() => null),
          },
        }),
      );

      // Create map for the files
      const filesMap: { [key: string]: string[] } = {};
      images.forEach((_, index) => {
        filesMap[index.toString()] = [`variables.images.${index}`];
      });

      formData.append('map', JSON.stringify(filesMap));

      // Append the actual files to formData
      images.forEach((image, index) => {
        formData.append(`${index}`, {
          uri: image.uri,
          name: image.name,
          type: image.type,
        } as never);
      });

      return executeWithFormData<{ createTicket: { id: string } }>(formData);
    },
  });
};

export default useCreateTicket;
