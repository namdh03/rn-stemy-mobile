import * as WebBrowser from 'expo-web-browser';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { RepayOrderMutation } from '~services/order.services';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

const useRepayOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: repayOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(RepayOrderMutation, { orderId }),
  });

  const onRepayOrder = (orderId: number) => {
    repayOrderMutate(orderId, {
      onSuccess: async (data) => {
        await WebBrowser.openAuthSessionAsync(data.data.repayOrder);
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('repayOrder'));
          if (error?.message) {
            return showDialogError({ textBody: error.message });
          }
        }
        showDialogError();
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [constants.ORDER_QUERY_KEY.GET_COUNT_ORDER_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, OrderStatus.Unpaid],
        });
      },
    });
  };

  return { onRepayOrder };
};

export default useRepayOrder;
