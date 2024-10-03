import { View } from 'react-native';

import { Skeleton } from '~/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <View className='p-[12px] w-full rounded-[10px] border border-[#0000000d] bg-card shadow-sm shadow-foreground/10'>
      <Skeleton className='w-full h-[155px] rounded-[4px]' />
      <Skeleton className='mt-[20px] h-[20px] w-[70%]' />
      <Skeleton className='mt-[4px] h-[18px] w-[50%]' />
      <View className='w-full flex-row items-center mt-[10px]'>
        <Skeleton className='h-[16px] w-[50px]' />
        <Skeleton className='ml-[12px] h-[16px] w-[80px]' />
      </View>
    </View>
  );
};

export default ProductCardSkeleton;
