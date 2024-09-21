import { ActivityIndicator, Image, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import images from '~assets/images';
import Pressable from '~components/customs/Pressable';
import { Form, FormField, FormInput } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import execute from '~graphql/execute';
import { ForgotPassword } from '~services/user.serivces';
import { ForgotPasswordScreenNavigationProps } from '~types/navigation';
import isErrors from '~utils/responseChecker';

import schema, { ForgotPasswordFormType } from './scheme';

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenNavigationProps) => {
  const form = useForm<ForgotPasswordFormType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ForgotPasswordFormType) => execute(ForgotPassword, values),
  });

  const onSubmit = (values: ForgotPasswordFormType) => {
    mutate(values, {
      onSuccess: () => {
        navigation.navigate('ForgotPasswordConfirmScreen', values);
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('forgotPassword'));

          if (error?.message) {
            form.setError('email', { message: error.message });
          }
        }
      },
    });
  };

  return (
    <ScrollView
      contentContainerClassName='items-center p-[24px] py-[38px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Text className='font-inter-black text-primary text-center text-[24px] tracking-[0.24px]'>Forgot Password</Text>
      <Text className='font-inter-regular mt-[16px] text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        Enter your mail should we use to reset your password.
      </Text>
      <Image source={images.forgotPassword} className='mt-[37px] w-[298px] h-[275px] rounded-[8px]' />

      <Form {...form}>
        <View className='gap-[16px] mt-[66px] w-full'>
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

          <View className='flex-row self-start'>
            <Pressable onPress={() => navigation.goBack()}>
              <Text className='font-inter-semiBold text-primary text-[14px]'>Already have a account?</Text>
            </Pressable>
          </View>

          <Button disabled={isPending} className='mt-[8px] min-h-[44px]' onPress={form.handleSubmit(onSubmit)}>
            {isPending ? (
              <View className='flex-row items-center justify-center gap-[6px]'>
                <ActivityIndicator />
                <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Loading...</Text>
              </View>
            ) : (
              <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Send</Text>
            )}
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
