import { View } from 'react-native';

import { Separator } from '~components/ui/separator';
import { Skeleton } from '~components/ui/skeleton';

const OrderItemSkeleton = () => {
  return (
    <View className='py-[14px] bg-background'>
      {/* Header (Date & Status) */}
      <View className='flex-row justify-between items-center px-[25px]'>
        <Skeleton className='w-[100px] h-[14px]' />
        <Skeleton className='w-[80px] h-[14px]' />
      </View>

      {/* Product Image and Details */}
      <View className='flex-row items-center mt-[16px] mb-[8px] px-[25px]'>
        <Skeleton className='w-[72px] h-[72px] rounded-[4px]' />
        <View className='flex-1 items-start ml-[12px]'>
          <Skeleton className='w-[150px] h-[12px]' />
          <View className='flex-row items-center justify-between w-full mt-[8px]'>
            <Skeleton className='w-[80px] h-[12px]' />
            <Skeleton className='w-[20px] h-[12px]' />
          </View>
          <Skeleton className='w-[80px] h-[14px] mt-[11px] self-end' />
        </View>
      </View>

      {/* Separators and Buttons */}
      <Separator className='bg-muted' />
      <Skeleton className='w-[120px] h-[20px] my-[10px] mx-[25px]' />
      <Separator className='bg-muted' />

      {/* Order Summary */}
      <View className='flex-row justify-between px-[25px] py-[8px]'>
        <Skeleton className='w-[100px] h-[12px]' />
        <Skeleton className='w-[120px] h-[14px]' />
      </View>

      <Separator className='bg-muted' />

      {/* Action Button */}
      <View className='ml-auto px-[25px]'>
        <Skeleton className='w-[100px] h-[40px] rounded-[6px]' />
      </View>
    </View>
  );
};

export default OrderItemSkeleton;
