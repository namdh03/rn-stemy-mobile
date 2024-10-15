import { View } from 'react-native';

import { Skeleton } from '~components/ui/skeleton';

const TicketSkeleton = () => {
  return (
    <View className='w-full pl-[6px] pt-[6px] pb-[12px] pr-[12px] bg-background rounded-[6px] border-l-[20px] border-background'>
      <View className='flex-row justify-between'>
        <View>
          <Skeleton className='w-[120px] h-[14px]' />
          <Skeleton className='w-[90px] h-[12px] mt-[4px]' />
        </View>
        <View className='mt-[3px]'>
          <Skeleton className='w-[70px] h-[12px]' />
          <Skeleton className='w-[50px] h-[20px] mt-[6px] rounded-[6px] border-muted border' />
        </View>
      </View>

      <View className='flex-row items-center mt-[10px]'>
        <Skeleton className='w-[40px] h-[40px] rounded-[4px]' />
        <View className='flex-1 items-start ml-[10px]'>
          <Skeleton className='w-[100px] h-[12px]' />
          <Skeleton className='w-[140px] h-[10px] mt-[4px]' />
        </View>
      </View>

      <View className='mt-[8px]'>
        <Skeleton className='w-[200px] h-[12px]' />
        <Skeleton className='w-full h-[12px] mt-[4px]' />
      </View>
    </View>
  );
};

export default TicketSkeleton;
