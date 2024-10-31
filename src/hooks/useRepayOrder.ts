import * as WebBrowser from 'expo-web-browser';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showConfirmModal } from '~components/customs/Modal/Modal';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { RepayOrderMutation } from '~services/order.services';
import { ALERT_TYPE } from '~store/modal/modal.type';
import isErrors from '~utils/responseChecker';

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
            return showConfirmModal({
              type: ALERT_TYPE.DANGER,
              title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
              message: error.message,
            });
          }
        }
        showConfirmModal({
          type: ALERT_TYPE.DANGER,
          title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
          message: constants.MESSAGES.SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
        });
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
