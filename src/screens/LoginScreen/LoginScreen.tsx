import { useRef } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import InputPassword from '~components/customs/InputPassword';
import { showAlertModal } from '~components/customs/Modal/Modal';
import Pressable from '~components/customs/Pressable';
import { Form, FormField, FormInput } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import AuthLayout from '~layouts/AuthLayout';
import { LoginMutation } from '~services/user.serivces';
import { ALERT_TYPE } from '~store/modal/modal.type';
import { LoginScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';

import schema, { LoginFormType } from './schema';

const LoginScreen = ({ navigation }: LoginScreenNavigationProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const form = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: LoginFormType) => execute(LoginMutation, values),
  });

  const onSubmit = (values: LoginFormType) => {
    mutate(values, {
      onSuccess: () => {
        scrollRef.current?.scrollTo({ y: 0 });
        form.reset();
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('login'));

          if (error?.message) {
            form.setError('email', { message: error.message });
            form.setError('password', { message: error.message });
          }
        } else {
          showAlertModal({
            type: ALERT_TYPE.DANGER,
            title: constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
            message: errors.message,
            autoClose: true,
            autoCloseTime: 1500,
          });
        }
      },
    });
  };

  return (
    <AuthLayout ref={scrollRef} title='Welcome!'>
      <Form {...form}>
        <View className='gap-[24px] mt-[24px] w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormInput
                className='font-inter-regular h-[48px] px-[16px] py-[12px]'
                placeholder='Email Address'
                autoCapitalize='none'
                autoComplete='email'
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => <InputPassword placeholder='Password' {...field} />}
          />

          <View className='flex-row self-start'>
            <Pressable onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text className='font-inter-semiBold text-primary text-[14px]'>Forgot password?</Text>
            </Pressable>
          </View>

          <Button disabled={isPending} className='min-h-[44px]' onPress={form.handleSubmit(onSubmit)}>
            {isPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Loading...</Text>
              </View>
            ) : (
              <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Login</Text>
            )}
          </Button>

          <View className='flex-row justify-center items-center gap-[4px]'>
            <Text className='font-inter-regular text-muted-foreground text-[14px] leading-[16px] tracking-[0.12px]'>
              Not a member?
            </Text>
            <Pressable className='-mt-[1.5px]' onPress={() => navigation.replace('RegisterScreen')}>
              <Text className='font-inter-semiBold text-primary text-[14px] leading-[16px]'>Register now</Text>
            </Pressable>
          </View>
        </View>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
