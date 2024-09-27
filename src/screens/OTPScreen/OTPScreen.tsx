import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Form, FormField, FormMessage } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import execute from '~graphql/execute';
import { GetTokenResetPasswordMutation, SendResetPasswordOTPMutation } from '~services/user.serivces';
import { OTPScreenNavigationProps } from '~types/navigation';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

import schema, { OTPFormType } from './schema';

const OTPScreen = ({ route, navigation }: OTPScreenNavigationProps) => {
  const [timer, setTimer] = useState(0);
  const form = useForm<OTPFormType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      OTPCode: '',
    },
  });
  const { mutate: sendOTPMutate, isPending: isSendOTPPending } = useMutation({
    mutationFn: (OTPCode: string) => execute(GetTokenResetPasswordMutation, { email: route.params.email, OTPCode }),
  });
  const { mutate: resendOTPMutate, isPending: isResendOTPPending } = useMutation({
    mutationFn: () => execute(SendResetPasswordOTPMutation, { email: route.params.email }),
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOTPCodeInputChange = (text: string) => {
    form.setValue('OTPCode', text);
    form.clearErrors();
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(30);
      resendOTPMutate(undefined, {
        onError: (errors) => {
          showDialogError({ textBody: errors.message });
        },
      });
    }
  };

  const onSubmit = (values: OTPFormType) => {
    sendOTPMutate(values.OTPCode, {
      onSuccess: (data) => navigation.navigate('ResetPasswordScreen', { token: data.data.getTokenResetPassword }),
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('getTokenResetPassword'));

          if (error?.message) {
            form.setError('OTPCode', { message: error.message });
          }
        }

        showDialogError({ textBody: errors.message });
      },
    });
  };

  return (
    <ScrollView
      contentContainerClassName='flex-1 items-center p-[24px] py-[38px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Text className='font-inter-black text-primary text-center text-[24px] tracking-[0.24px]'>Enter OTP code</Text>
      <Text className='font-inter-regular mt-[16px] text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        A 4-digit code was sent to
      </Text>
      <Text className='font-inter-regular text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        {route.params.email}
      </Text>

      <Form {...form}>
        <FormField
          control={form.control}
          name='OTPCode'
          render={() => (
            <>
              <OtpInput
                numberOfDigits={4}
                focusColor='#16A34A'
                focusStickBlinkingDuration={500}
                onTextChange={handleOTPCodeInputChange}
                onFilled={(text) => form.setValue('OTPCode', text)}
                textInputProps={{
                  accessibilityLabel: 'One-Time Password',
                }}
                theme={{
                  containerStyle: styles.container,
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeTextStyle,
                  focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
                }}
              />

              <FormMessage className='mt-[8px]' />
            </>
          )}
        />

        <View className='gap-[20px] mt-auto w-full'>
          <Button variant='ghost' onPress={handleResendCode} disabled={isResendOTPPending || timer > 0}>
            <Text className='font-inter-semiBold text-primary text-[14px]'>
              {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
            </Text>
          </Button>

          <Button className='min-h-[44px]' onPress={form.handleSubmit(onSubmit)}>
            {isSendOTPPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Loading...</Text>
              </View>
            ) : (
              <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Confirm</Text>
            )}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: 8,
    marginTop: 60,
  },
  pinCodeContainer: {
    minWidth: 56,
    minHeight: 56,
    borderRadius: 12,
  },
  pinCodeTextStyle: {
    fontFamily: 'Inter_18pt-Regular',
  },
  focusedPinCodeContainer: {
    borderWidth: 1.5,
  },
});

export default OTPScreen;
