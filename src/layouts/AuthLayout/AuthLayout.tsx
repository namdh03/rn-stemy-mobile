import { forwardRef, ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';

import LoginWithGoogle from '~components/customs/LoginWithGoogle';
import Logo from '~components/customs/Logo';
import { Separator } from '~components/ui/separator';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = forwardRef<ScrollView, AuthLayoutProps>(({ children }, ref) => {
  return (
    <ScrollView
      ref={ref}
      contentContainerClassName='items-center p-[24px] py-[50px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Logo />
      <Text className='font-jaro-regular mt-[4px] text-foreground text-center text-[32px] leading-[44.8px]'>
        STEMMY
      </Text>
      <Text className='font-inter-regular text-muted-foreground text-center text-[14px] leading-[19.6px]'>
        Empowering Learning, Simplifying STEM
      </Text>
      <Text className='font-inter-black mt-[62px] w-full text-left text-primary text-[24px] tracking-[0.24px]'>
        Welcome!
      </Text>

      {children}

      <View className='gap-[24px] mt-[24px] w-full'>
        <Separator />

        <View className='gap-[16px]'>
          <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[16px] tracking-[0.12px]'>
            Or continue with
          </Text>

          <LoginWithGoogle />
        </View>
      </View>
    </ScrollView>
  );
});

export default AuthLayout;
