import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { ChevronRight, MapPin } from '~components/icons';
import { Text } from '~components/ui/text';
import { useStore } from '~store';

const CheckoutUserInfo = () => {
  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  return (
    <View className='flex-row gap-[4px] px-[14px] py-[18px] bg-accent border-b-[3px] border-primary'>
      <MapPin className='text-[#EF4444]' size={24} />
      <View className='flex-1 flex-row items-center justify-between w-full'>
        <View className='flex-1'>
          <Text className='font-inter-semiBold text-[14px] text-foreground'>Delivery Address</Text>
          <Text className='font-inter-regular mt-[6px] text-[14px] text-foreground'>
            {user?.fullName} {!user?.phone && `| (+84) ${Number(123).toString().slice(1)}`}
          </Text>
          {user?.address && (
            <Text className='font-inter-light mt-[8px] text-[14px] text-foreground'>{user.address}</Text>
          )}
        </View>

        <ChevronRight className='flex-shrink-0 text-muted-foreground' size={30} />
      </View>
    </View>
  );
};

export default CheckoutUserInfo;
