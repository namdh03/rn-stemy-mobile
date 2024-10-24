import { View } from 'react-native';

import { Separator } from '~components/ui/separator';
import { Skeleton } from '~components/ui/skeleton';

const DeliverySkeleton = () => {
  return (
    <View className='py-[16px] bg-background rounded-[6px]'>
      <View className='px-[16px]'>
        <View className='flex-row justify-between items-center'>
          <Skeleton className='w-[120px] h-[16px]' />
          <Skeleton className='w-[80px] h-[12px]' />
        </View>
        <Skeleton className='w-[100px] h-[14px] mt-[4px]' />
      </View>

      <Separator className='my-[8px] bg-muted' />

      <View className='px-[16px]'>
        <Skeleton className='w-[150px] h-[12px] mb-[8px]' />
        <Skeleton className='w-[100px] h-[12px] mb-[8px]' />
        <Skeleton className='w-[200px] h-[12px] mb-[8px]' />
      </View>

      <Separator className='my-[8px] bg-muted' />

      <View className='flex-row justify-between w-full px-[25px] py-[8px]'>
        <Skeleton className='w-[60px] h-[12px]' />
        <Skeleton className='w-[100px] h-[14px]' />
      </View>

      <View className='ml-auto px-[16px]'>
        <Skeleton className='w-[100px] h-[32px] rounded-[4px]' />
      </View>
    </View>
  );
};

export default DeliverySkeleton;
