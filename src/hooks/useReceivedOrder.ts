import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showConfirmModal } from '~components/customs/Modal/Modal';
import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { ReceivedOrderMutation } from '~services/order.services';
import { ALERT_TYPE } from '~store/modal/modal.type';
import { MainStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';

const useReceivedOrder = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { mutate: receivedOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(ReceivedOrderMutation, { orderId }),
  });

  const onReceivedOrder = (orderId: number, isGoBack: boolean = false) => {
    showConfirmModal({
      type: ALERT_TYPE.SUCCESS,
      title: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TITLE,
      message: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TEXT_BODY,
      confirmText: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_BUTTON,
      onConfirm: () => {
        receivedOrderMutate(orderId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [constants.ORDER_QUERY_KEY.GET_COUNT_ORDER_QUERY_KEY],
            });
            queryClient.invalidateQueries({
              queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, OrderStatus.Delivered],
            });

            if (isGoBack) navigation.goBack();
          },
          onError: (errors) => {
            if (isErrors(errors)) {
              const error = errors.find((error) => error.path.includes('receiveOrder'));
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
        });
      },
    });
  };

  return { onReceivedOrder };
};

export default useReceivedOrder;
