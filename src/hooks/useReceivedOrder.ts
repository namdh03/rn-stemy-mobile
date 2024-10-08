import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import { useMutation } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { ReceivedOrderMutation } from '~services/order.services';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogInfo from '~utils/showDialogInfo';

const useReceivedOrder = () => {
  const { mutate: receivedOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(ReceivedOrderMutation, { orderId }),
  });

  const onReceivedOrder = (orderId: number) => {
    showDialogInfo({
      title: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TITLE,
      textBody: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TEXT_BODY,
      button: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_BUTTON,
      onPressButton: () =>
        receivedOrderMutate(orderId, {
          onSuccess: () => {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
              textBody: constants.MESSAGES.ORDER_MESSAGES.COPY_ORDER_ID,
            });
            Dialog.hide();
          },
          onError: (errors) => {
            if (isErrors(errors)) {
              const error = errors.find((error) => error.path.includes('receiveOrder'));
              if (error?.message) {
                return showDialogError({ textBody: error.message });
              }
            }
            showDialogError();
          },
        }),
    });
  };

  return { onReceivedOrder };
};

export default useReceivedOrder;
