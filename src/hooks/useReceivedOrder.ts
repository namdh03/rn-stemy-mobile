import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { OrderStatus } from '~graphql/graphql';
import { ReceivedOrderMutation } from '~services/order.services';
import { MainStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogSuccess from '~utils/showDialogSuccess';

const useReceivedOrder = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { mutate: receivedOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(ReceivedOrderMutation, { orderId }),
  });

  const onReceivedOrder = (orderId: number, isGoBack: boolean = false) => {
    receivedOrderMutate(orderId, {
      onSuccess: () => {
        showDialogSuccess({
          title: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TITLE,
          textBody: constants.MESSAGES.ORDER_MESSAGES.RECEIVED_ORDER_TEXT_BODY,
          onHide: () => {
            queryClient.invalidateQueries({
              queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, OrderStatus.Delivered],
            });
            if (isGoBack) navigation.goBack();
          },
        });
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
    });
  };

  return { onReceivedOrder };
};

export default useReceivedOrder;
