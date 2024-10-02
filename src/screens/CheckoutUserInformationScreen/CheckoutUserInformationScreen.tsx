import { Text as RNText, View } from 'react-native';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Form, FormField, FormInput, FormTextarea } from '~components/deprecated-ui/form';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { MainStackParamList } from '~types/navigation.type';

import schema, { CheckoutUserInformationFormType } from './schema';

const CheckoutUserInformationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { fullName, phone, address, setCheckoutData } = useStore(
    useShallow((state) => ({
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

  // TODO: Call API Update User
  // const { mutate, isPending } = useMutation({
  //   mutationFn: (values: CheckoutUserInformationFormType) => {
  //     console.log(values);
  //   },
  // });

  const onSubmit = (values: CheckoutUserInformationFormType) => {
    setCheckoutData(values);
    navigation.goBack();
    // mutate(values, {
    //   onSuccess: () => {},
    //   onError: (error) => {},
    // });
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

          <Button size='lg' className='mt-[22px]' onPress={form.handleSubmit(onSubmit)}>
            <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Update</RNText>
          </Button>
        </View>
      </Form>
    </ScrollView>
  );
};

export default CheckoutUserInformationScreen;
