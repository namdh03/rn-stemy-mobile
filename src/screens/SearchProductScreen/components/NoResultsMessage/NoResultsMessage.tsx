import { memo } from 'react';
import { View } from 'react-native';

import { Inbox } from '~components/icons';
import { Text } from '~components/ui/text';

const NoResultsMessage = () => {
  return (
    <View className='mt-[20px] gap-[20px] items-center'>
      <Inbox size={64} className='text-muted-foreground' strokeWidth={0.4} />
      <Text className='font-inter-medium mt-[10px] text-center text-foreground text-[16px] leading-[20px] tracking-[0.2px] capitalize'>
        There are no suitable products
      </Text>
      <Text className='font-inter-regular text-center text-muted-foreground text-[14px] leading-[18px]'>
        Please try using other keywords to find the product name
      </Text>
    </View>
  );
};

export default memo(NoResultsMessage);
