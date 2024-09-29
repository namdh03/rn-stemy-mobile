import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronRight, MapPin } from '~components/icons';
import { Text } from '~components/ui/text';
import { useStore } from '~store';
import { MainStackParamList } from '~types/navigation.type';

const CheckoutUserInfo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const { user, phone, address } = useStore(
    useShallow((state) => ({
      user: state.user,
      phone: state.checkoutData.phone,
      address: state.checkoutData.address,
    })),
  );

  return (
    <View className='flex-row gap-[4px] px-[14px] py-[18px] bg-accent border-b-[3px] border-primary'>
      <MapPin className='text-[#EF4444]' size={24} />
      <View className='flex-1 flex-row items-center justify-between w-full'>
        <View className='flex-1'>
          <Text className='font-inter-semiBold text-[14px] text-foreground'>Delivery Address</Text>
          <Text className='font-inter-regular mt-[6px] text-[14px] text-foreground'>
            {user?.fullName} {phone && `| (+84) ${phone.slice(1)}`}
          </Text>
          {address && <Text className='font-inter-light mt-[8px] text-[14px] text-foreground'>{address}</Text>}
        </View>

        <Pressable onPress={() => navigation.navigate('PhoneAndAddressScreen')}>
          <ChevronRight className='flex-shrink-0 text-muted-foreground' size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default CheckoutUserInfo;
