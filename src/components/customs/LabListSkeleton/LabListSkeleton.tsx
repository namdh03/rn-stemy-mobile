import { View } from 'react-native';

import { Skeleton } from '~components/ui/skeleton';

import LabComponentSkeleton from '../LabComponentSkeleton';

const LabListSkeleton = () => {
  return (
    <View>
      <Skeleton className='w-[300px] h-[20px] mb-[16px]' /> {/* Accordion Trigger Skeleton */}
      <LabComponentSkeleton />
      <LabComponentSkeleton />
      <LabComponentSkeleton />
    </View>
  );
};

export default LabListSkeleton;
