import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import Pressable from '~components/customs/Pressable';
import CircleX from '~components/icons/CircleX';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { useColorScheme } from '~hooks';

interface APaymentMethodBottomSheetProps {
  onClose: () => void;
}

const PaymentMethodBottomSheet = forwardRef<BottomSheet, APaymentMethodBottomSheetProps>(({ onClose }, ref) => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <BottomSheet ref={ref} snapPoints={['30%', '30%']} enablePanDownToClose index={-1}>
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
          <Button size='lg' className='mt-[28px]' onPress={onClose}>
            <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Confirm</RNText>
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default PaymentMethodBottomSheet;
