import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import constants from '~constants';
import execute from '~graphql/execute';
import { ReOrderMutation } from '~services/order.services';
import { useCartStore } from '~store';
import { MainStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

const useReOrder = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { setMultipleSelectedCart } = useCartStore(
    useShallow((state) => ({
      setMultipleSelectedCart: state.setMultipleSelectedCart,
    })),
  );
  const { mutate: reOrderMutate } = useMutation({
    mutationFn: (orderId: number) => execute(ReOrderMutation, { orderId }),
  });

  const onReOrder = (orderId: number) => {
    reOrderMutate(orderId, {
      onSuccess: (data) => {
        setMultipleSelectedCart(data.data.reOrder);
        queryClient.invalidateQueries({ queryKey: [constants.CART_QUERY_KEY.GET_CART_QUERY_KEY] });
        queryClient.invalidateQueries({ queryKey: [constants.CART_QUERY_KEY.GET_CART_COUNT_QUERY_KEY] });
        navigation.navigate('CartScreen');
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('reOrder'));
          if (error?.message) {
            return showDialogError({ textBody: error.message });
          }
        }
        showDialogError();
      },
    });
  };

  return { onReOrder };
};

export default useReOrder;
