import { Dialog } from 'react-native-alert-notification';
import * as WebBrowser from 'expo-web-browser';

import { useMutation } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { RepayOrderMutation } from '~services/order.services';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogWarning from '~utils/showDialogWarning';

const useRepayOrder = () => {
  const { mutate: repayOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(RepayOrderMutation, { orderId }),
  });

  const onRepayOrder = (orderId: number) => {
    showDialogWarning({
      title: constants.MESSAGES.ORDER_MESSAGES.REPAY_ORDER_TITLE,
      textBody: constants.MESSAGES.ORDER_MESSAGES.REPAY_ORDER_TEXT_BODY,
      button: constants.MESSAGES.ORDER_MESSAGES.REPAY_ORDER_BUTTON,
      onPressButton: () =>
        repayOrderMutate(orderId, {
          onSuccess: async (data) => {
            Dialog.hide();
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
        }),
    });
  };

  return { onRepayOrder };
};

export default useRepayOrder;
