import { View } from 'react-native';

import { MapPin } from '~components/icons';
import { Text } from '~components/ui/text';

interface OrderUserInfoProps {
  fullName: string;
  phone: string;
  address: string;
}

const OrderUserInfo = ({ fullName, phone, address }: OrderUserInfoProps) => {
  return (
    <View className='flex-row gap-[4px] px-[14px] py-[18px] bg-background border-b-[3px] border-primary'>
      <MapPin className='text-[#EF4444]' size={24} />
      <View className='flex-1 flex-row items-center justify-between w-full'>
        <View className='flex-1'>
          <Text className='font-inter-semiBold text-[14px] text-foreground'>Delivery Address</Text>
          <Text className='font-inter-regular mt-[6px] text-[14px] text-foreground'>
            {fullName} {phone && `| (+84) ${phone.slice(1)}`}
          </Text>
          {address && <Text className='font-inter-light mt-[8px] text-[14px] text-foreground'>{address}</Text>}
        </View>
      </View>
    </View>
  );
};

export default OrderUserInfo;
