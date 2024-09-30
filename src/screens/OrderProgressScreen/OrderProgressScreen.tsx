import { useEffect } from 'react';

import { useMutation } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import execute from '~graphql/execute';
import { CheckoutOrderInput } from '~graphql/graphql';
import { CheckoutOrderMutation } from '~services/checkout.services';
import { OrderProgressScreenNavigationProps } from '~types/navigation.type';

const OrderProgressScreen = ({ route, navigation }: OrderProgressScreenNavigationProps) => {
  const { mutate } = useMutation({
    mutationFn: (input: CheckoutOrderInput) => execute(CheckoutOrderMutation, { input }),
  });

  useEffect(() => {
    if (route.params) {
      mutate(route.params, {
        onSuccess: () => {
          return navigation.replace('OrderSuccessScreen', { totalPrice: Number(route.params?.vnp_Amount) });
        },
        onError: () => {
          return navigation.replace('OrderErrorScreen');
        },
      });
    }
  }, [route.params]);

  return <LoadingOverlay loop message='Checking Order...' />;
};

export default OrderProgressScreen;
