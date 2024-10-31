import { Text as RNText, View } from 'react-native';
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showAlertModal } from '~components/customs/Modal/Modal';
import { Form, FormField, FormInput, FormTextarea } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { UpdateMeMutationVariables } from '~graphql/graphql';
import { UpdateMeMutation } from '~services/user.serivces';
import { useStore } from '~store';
import { ALERT_TYPE } from '~store/modal/modal.type';
import { RootStackParamList } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';

import schema, { CheckoutUserInformationFormType } from './schema';

const CheckoutUserInformationScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, fullName, phone, address, setCheckoutData } = useStore(
    useShallow((state) => ({
      user: state.user,
      fullName: state.checkoutData.fullName,
      phone: state.checkoutData.phone,
      address: state.checkoutData.address,
      setCheckoutData: state.setCheckoutData,
    })),
  );
  const form = useForm<CheckoutUserInformationFormType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: fullName || '',
      phone: phone || '',
      address: address || '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: UpdateMeMutationVariables) =>
      execute(UpdateMeMutation, {
        ...values,
      }),
  });

  const onSubmit = (values: CheckoutUserInformationFormType) => {
    if (!user) return;
    setCheckoutData(values);

    // Update user when empty information
    const updates = {
      ...(user.fullName ? {} : { fullName: values.fullName }),
      ...(user.phone ? {} : { phone: values.phone }),
      ...(user.address ? {} : { address: values.address }),
    };

    if (Object.keys(updates).length > 0) {
      mutate(updates, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [constants.USER_QUERY_KEY.GET_ME_QUERY_KEY] });
          navigation.goBack();
        },
        onError: (errors) => {
          if (isErrors(errors)) {
            const error = errors.find((error) => error.path.includes('updateUser'));
            if (error?.message) {
              return showAlertModal({
                type: ALERT_TYPE.DANGER,
                message: error.message,
                autoClose: true,
                autoCloseTime: 1500,
              });
            }
          }
          showAlertModal({
            type: ALERT_TYPE.DANGER,
            message: constants.MESSAGES.SYSTEM_MESSAGES.MISSING_INFORMATION,
            autoClose: true,
            autoCloseTime: 1500,
          });
          navigation.goBack();
        },
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      contentContainerClassName='items-center px-[24px] py-[38px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Text className='font-inter-black text-primary text-center text-[24px] tracking-[0.24px]'>Update Details</Text>
      <Text className='font-inter-regular mt-[16px] text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        Please provide or update your phone number and address for your order.
      </Text>

      <Form {...form}>
        <View className='gap-[16px] mt-[40px] w-full'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormInput
                className='font-inter-regular h-[48px] px-[16px] py-[12px]'
                placeholder='Full Name'
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormInput
                className='font-inter-regular h-[48px] px-[16px] py-[12px]'
                placeholder='Phone Number'
                keyboardType='number-pad'
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormTextarea
                className='font-inter-regular px-[16px] py-[12px]'
                placeholder='Address'
                autoCapitalize='none'
                {...field}
              />
            )}
          />

          <Button disabled={isPending} size='lg' className='mt-[16px]' onPress={form.handleSubmit(onSubmit)}>
            {isPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Loading...</RNText>
              </View>
            ) : (
              <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Confirm</RNText>
            )}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

export default CheckoutUserInformationScreen;
