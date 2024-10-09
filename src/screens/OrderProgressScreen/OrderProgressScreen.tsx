import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import constants from '~constants';
import execute from '~graphql/execute';
import { CheckoutOrderInput, OrderStatus } from '~graphql/graphql';
import { CheckoutOrderMutation } from '~services/checkout.services';
import { OrderProgressScreenNavigationProps } from '~types/navigation.type';

const OrderProgressScreen = ({ route, navigation }: OrderProgressScreenNavigationProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (input: CheckoutOrderInput) => execute(CheckoutOrderMutation, { input }),
  });

  useEffect(() => {
    if (route.params && Object.keys(route.params).length > 0) {
      mutate(route.params, {
        onSuccess: () => {
          return navigation.replace('OrderSuccessScreen', { totalPrice: Number(route.params?.vnp_Amount) });
        },
        onError: () => {
          return navigation.replace('OrderErrorScreen');
        },
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY, OrderStatus.Unpaid],
          });
        },
      });
    } else {
      navigation.replace('OrderErrorScreen');
    }
  }, [route.params]);

  return <LoadingOverlay loop message='Checking Order...' />;
};

export default OrderProgressScreen;
