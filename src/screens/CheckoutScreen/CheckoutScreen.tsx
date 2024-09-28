import { useRef } from 'react';
import { FlatList, Text as RNText, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import BottomSheet from '@gorhom/bottom-sheet';

import { CircleDollarSign } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { useStore } from '~store';

import CheckoutItem from './components/CheckoutItem';
import CheckoutUserInfo from './components/CheckoutUserInfo';
import PaymentMethodBottomSheet from './components/PaymentMethodBottomSheet';

const CheckoutScreen = () => {
  const { total, selectedCart } = useStore(
    useShallow((state) => ({
      total: state.total,
      selectedCart: state.selectedCart,
    })),
  );
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCloseChoosePayment = () => {
    bottomSheetRef.current?.close();
  };

  const handleOpenPaymentMethod = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <CheckoutUserInfo />

      <FlatList
        data={Object.values(selectedCart || {})}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CheckoutItem item={item} />}
        ItemSeparatorComponent={() => <Separator className='bg-muted my-[14px]' />}
        className='flex-1'
        contentContainerStyle={{ paddingTop: 24, paddingHorizontal: 24, paddingBottom: 220 }}
      />

      <View className='absolute left-0 right-0 bottom-0 bg-card'>
        <Separator className='bg-muted' />
        <View className='px-[24px] py-[12px]'>
          <View className='flex-row items-center'>
            <CircleDollarSign className='text-[#EF4444]' size={24} strokeWidth={1.5} />
            <Text className='font-inter-medium text-foreground text-[16px] ml-[10px]'>Payment Option</Text>
            <Button size='sm' className='ml-auto' variant='ghost' onPress={handleOpenPaymentMethod}>
              <RNText className='font-inter-medium text-primary text-[16px]'>Choose </RNText>
            </Button>
          </View>
        </View>
        <Separator className='bg-muted' />

        <View className='px-[24px] pb-[24px] mt-[14px]'>
          <View className='flex-row items-center justify-between px-[12px] py-[8px]'>
            <Text className='font-inter-regular text-muted-foreground text-[16px] leading-[20px]'>
              Order payment ({Object.values(selectedCart || {}).length} item)
            </Text>
            <Text className='font-inter-extraBold text-foreground text-[16px]'>{total.toLocaleString()} ₫</Text>
          </View>

          <Button size='lg' className='mt-[16px]'>
            <RNText className='font-inter-medium text-background text-[16px] leading-[20px]'>Place Order</RNText>
          </Button>
        </View>
      </View>

      <PaymentMethodBottomSheet ref={bottomSheetRef} onClose={handleCloseChoosePayment} />
    </>
  );
};

export default CheckoutScreen;
