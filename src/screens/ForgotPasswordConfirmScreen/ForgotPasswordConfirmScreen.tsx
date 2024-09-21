import { View } from 'react-native';
import { Image, ScrollView, Text } from 'react-native';

import images from '~assets/images';
import { Mail } from '~components/icons';
import { Button } from '~components/ui/button';
import { ForgotPasswordConfirmScreenNavigationProps } from '~types/navigation';

const ForgotPasswordConfirmScreen = ({ route, navigation }: ForgotPasswordConfirmScreenNavigationProps) => {
  return (
    <ScrollView
      contentContainerClassName='items-center p-[24px] py-[38px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Text className='font-inter-black text-primary text-center text-[24px] tracking-[0.24px]'>Forgot Password</Text>
      <Text className='font-inter-regular mt-[16px] text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        Confirm mail should we use to reset your password.
      </Text>
      <Image source={images.forgotPassword} className='mt-[37px] w-[298px] h-[275px] rounded-[8px]' />

      <View className='gap-[32px] mt-[77px] w-full'>
        <View className='flex-row gap-[10px] px-[16px] py-[12px] rounded-[6px] border-primary border-solid border-[1px]'>
          <View className='justify-center items-center w-[50px] h-[50px] rounded-full bg-primary'>
            <Mail className='text-card' />
          </View>

          <View className='justify-center gap-[4px]'>
            <Text className='font-inter-semiBold text-muted-foreground text-[14px] leading-[16px]'>
              Send OTP via Email
            </Text>
            <Text className='font-inter-regular text-secondary-foreground text-[14px] leading-[16px]'>
              {route.params.email}
            </Text>
          </View>
        </View>

        <Button
          className='mt-[8px] min-h-[44px]'
          onPress={() => navigation.navigate('OTPScreen', { email: route.params.email })}
        >
          <Text className='font-inter-medium text-secondary text-[16px] leading-[24px]'>Confirm</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordConfirmScreen;
