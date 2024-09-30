import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import images from '~assets/images';
import InputPassword from '~components/customs/InputPassword';
import { Form, FormField } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import execute from '~graphql/execute';
import { ResetPasswordMutation } from '~services/user.serivces';
import { ResetPasswordScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

import schema, { ResetPasswordFormType } from './schema';

const ResetPasswordScreen = ({ route, navigation }: ResetPasswordScreenNavigationProps) => {
  const form = useForm<ResetPasswordFormType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: ResetPasswordFormType) =>
      execute(ResetPasswordMutation, { token: route.params.token, password: values.password }),
  });

  const onSubmit = (values: ResetPasswordFormType) => {
    mutate(values, {
      onSuccess: () => navigation.navigate('LoginScreen'),
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('resetPassword'));

          if (error?.message) {
            form.setError('password', { message: error.message });
          }
        } else {
          showDialogError({ textBody: errors.message });
        }
      },
    });
  };

  return (
    <ScrollView
      contentContainerClassName='items-center px-[24px] py-[38px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Text className='font-inter-black text-primary text-center text-[24px] tracking-[0.24px]'>Reset Password</Text>
      <Text className='font-inter-regular mt-[16px] text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        Enter your new password to reset your account.
      </Text>
      <Image source={images.resetPassword} className='mt-[37px] w-[252px] h-[252px] rounded-[8px]' />

      <Form {...form}>
        <View className='gap-[16px] mt-[66px] w-full'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => <InputPassword placeholder='Enter new password' {...field} />}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => <InputPassword placeholder='Re-enter password' {...field} />}
          />

          <Button disabled={isPending} className='mt-[8px] min-h-[44px]' onPress={form.handleSubmit(onSubmit)}>
            {isPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator className='text-secondary' />
                <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Loading...</Text>
              </View>
            ) : (
              <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Reset</Text>
            )}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

export default ResetPasswordScreen;
