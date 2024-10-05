import { memo } from 'react';
import { Text } from 'react-native';

import { TabsTrigger } from '~components/ui/tabs';
import { OrderStatus } from '~graphql/graphql';
import { cn } from '~lib/utils';

interface TabButtonProps {
  value: OrderStatus;
  currentTab: OrderStatus;
  onPress: (value: OrderStatus) => void;
  label: string;
}

const TabButton = ({ value, currentTab, onPress, label }: TabButtonProps) => {
  return (
    <TabsTrigger
      value={value}
      className={cn('flex-1 border border-transparent rounded-[4px]', {
        'border-primary shadow': currentTab === value,
      })}
      onPress={() => onPress(value)}
    >
      <Text
        className={cn('font-inter-medium text-muted-foreground text-[12px] leading-[20px]', {
          'text-primary': currentTab === value,
        })}
      >
        {label}
      </Text>
    </TabsTrigger>
  );
};

export default memo(TabButton);
