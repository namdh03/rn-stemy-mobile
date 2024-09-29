import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { useShallow } from 'zustand/react/shallow';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import images from '~assets/images';
import Pressable from '~components/customs/Pressable';
import CircleX from '~components/icons/CircleX';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { PaymentProvider } from '~graphql/graphql';
import { useColorScheme } from '~hooks';
import { useStore } from '~store';

interface APaymentMethodBottomSheetProps {
  onClose: () => void;
}

const PaymentMethodBottomSheet = forwardRef<BottomSheet, APaymentMethodBottomSheetProps>(({ onClose }, ref) => {
  const { isDarkColorScheme } = useColorScheme();
  const { paymentProvider, setCheckoutData } = useStore(
    useShallow((state) => ({
      paymentProvider: state.checkoutData.paymentProvider,
      setCheckoutData: state.setCheckoutData,
    })),
  );

  return (
    <BottomSheet ref={ref} snapPoints={['45%', '45%']} enablePanDownToClose index={-1}>
      <BottomSheetView
        className='flex-1 pt-[20px] pb-[25px]'
        style={{ backgroundColor: isDarkColorScheme ? 'black' : 'white' }}
      >
        <View className='flex-row items-center justify-between w-full px-[25px]'>
          <Text className='font-inter-bold text-foreground text-[18px] leading-[24px] tracking-[0.2px]'>
            Payment method
          </Text>
          <Pressable onPress={onClose}>
            <CircleX size={24} className='text-foreground' />
          </Pressable>
        </View>

        <Separator className='mt-[20px] mb-[23px] bg-muted' />

        <View className='px-[25px]'>
          <Pressable
            className={`self-start rounded-[6px] bg-popover border p-[16px] ${
              paymentProvider === PaymentProvider.Vnpay ? 'border-primary' : 'border-muted'
            }`}
            onPress={() => setCheckoutData({ paymentProvider: PaymentProvider.Vnpay })}
          >
            <Image
              source={images.vnpay}
              placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
              style={{ width: 82, height: 55 }}
              contentFit='cover'
            />
          </Pressable>

          <Button size='lg' className='mt-[28px]' onPress={onClose}>
            <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Confirm</RNText>
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default PaymentMethodBottomSheet;
