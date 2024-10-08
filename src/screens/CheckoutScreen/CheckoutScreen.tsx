import { useRef } from 'react';
import { ActivityIndicator, FlatList, Text as RNText, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useShallow } from 'zustand/react/shallow';

import BottomSheet from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CircleDollarSign } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { CreateOrderMutation } from '~services/checkout.services';
import { useCartStore, useStore } from '~store';
import { CheckoutDataStrict } from '~store/checkout/checkout.type';
import { CheckoutScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

import CheckoutItem from './components/CheckoutItem';
import CheckoutUserInfo from './components/CheckoutUserInfo';
import PaymentMethodBottomSheet from './components/PaymentMethodBottomSheet';

const CheckoutScreen = ({ navigation }: CheckoutScreenNavigationProps) => {
  const queryClient = useQueryClient();
  const { total, selectedCart, clearOrderedCart } = useCartStore(
    useShallow((state) => ({
      total: state.total,
      selectedCart: state.selectedCart,
      clearOrderedCart: state.clearOrderedCart,
    })),
  );
  const checkoutData = useStore(useShallow((state) => state.checkoutData));
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { mutate: createOrderMutate, isPending: isCreateOrderPending } = useMutation({
    mutationFn: (data: CheckoutDataStrict) => execute(CreateOrderMutation, data),
  });

  const handleCloseChoosePayment = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpenPaymentMethod = () => {
    bottomSheetRef.current?.expand();
  };

  const handlePlaceOrder = () => {
    if (!checkoutData.fullName || !checkoutData.phone || !checkoutData.address) {
      return showDialogError({
        title: constants.MESSAGES.SYSTEM_MESSAGES.MISSING_INFORMATION,
        textBody: 'Please provide your phone number and address to complete your order.',
        button: 'Go to Update',
        onHide: () => navigation.navigate('CheckoutUserInformationScreen'),
      });
    }

    if (checkoutData) {
      createOrderMutate(
        {
          fullName: checkoutData.fullName.trim(),
          phone: checkoutData.phone.trim(),
          address: checkoutData.address.trim(),
          cartIds: [...checkoutData.cartIds],
          paymentProvider: checkoutData.paymentProvider,
        },
        {
          onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: [constants.CART_QUERY_KEY.GET_CART_COUNT_QUERY_KEY] });
            await WebBrowser.openAuthSessionAsync(data.data.createOrder);
            clearOrderedCart();
          },
          onError: (errors) => {
            if (isErrors(errors)) {
              const error = errors.find((error) => error.path.includes('createOrder'));
              if (error?.message) {
                return showDialogError({ textBody: error.message });
              }
            }
            showDialogError();
          },
        },
      );
    }
  };

  return (
    <>
      <CheckoutUserInfo />

      <FlatList
        data={Object.values(selectedCart || {})}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CheckoutItem item={item} />}
        ItemSeparatorComponent={() => <Separator className='bg-muted my-[14px]' />}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        className='flex-1'
        contentContainerStyle={{ paddingBottom: 220 }}
      />

      <View className='absolute left-0 right-0 bottom-0 bg-card'>
        <Separator className='bg-muted' />

        <View className='px-[24px] py-[12px]'>
          <View className='flex-row items-center'>
            <CircleDollarSign className='text-[#EF4444]' size={24} strokeWidth={1.5} />
            <Text className='font-inter-medium text-foreground text-[16px] ml-[10px]'>Payment Option</Text>
            <Button size='sm' className='ml-auto' variant='ghost' onPress={handleOpenPaymentMethod}>
              <RNText className='font-inter-medium text-primary text-[16px]'>Choose </RNText>
            </Button>
          </View>
        </View>

        <Separator className='bg-muted' />

        <View className='px-[24px] pb-[24px] mt-[14px]'>
          <View className='flex-row items-center justify-between px-[12px] py-[8px]'>
            <Text className='font-inter-regular text-muted-foreground text-[14px] leading-[20px]'>
              Order payment ({Object.values(selectedCart || {}).length} item
              {Object.values(selectedCart || {}).length > 1 ? 's' : ''})
            </Text>
            <Text className='font-inter-extraBold text-foreground text-[14px]'>{total.toLocaleString()} ₫</Text>
          </View>

          <Button disabled={isCreateOrderPending} size='lg' className='mt-[16px]' onPress={handlePlaceOrder}>
            {isCreateOrderPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Loading...</RNText>
              </View>
            ) : (
              <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Place Order</RNText>
            )}
          </Button>
        </View>
      </View>

      <PaymentMethodBottomSheet ref={bottomSheetRef} onClose={handleCloseChoosePayment} />
    </>
  );
};

export default CheckoutScreen;
