import { View } from 'react-native';

import { Skeleton } from '~/components/ui/skeleton';

const LabComponentSkeleton = () => {
  return (
    <View className='p-[16px] w-[327px] rounded-[6px] bg-white shadow-lg'>
      <View className='flex-row justify-between'>
        <View className='flex-row'>
          {/* Image Skeleton */}
          <Skeleton className='w-[68px] h-[72px] rounded-[4px]' />
          <View className='ml-[16px]'>
            {/* Title Skeleton */}
            <Skeleton className='w-[180px] h-[20px] mb-[8px]' />
            {/* Purchase Date Skeleton */}
            <Skeleton className='w-[100px] h-[16px] mb-[4px]' />
            {/* Number of Tickets Skeleton */}
            <Skeleton className='w-[80px] h-[12px]' />
          </View>
        </View>
        {/* Status Badge Skeleton */}
        <Skeleton className='w-[60px] h-[20px] rounded-[4px]' />
      </View>
      <Skeleton className='my-[12px] h-[1px] bg-muted' />
      {/* Active Date or Message Skeleton */}
      <Skeleton className='w-[250px] h-[16px]' />
      <View className='w-full flex-row items-center justify-end mt-[6px]'>
        <Skeleton className='w-[120px] h-[40px] rounded-[10px]' />
      </View>
    </View>
  );
};

export default LabComponentSkeleton;
