import { ReactNode } from 'react';
import { Pressable as RNPressable, View } from 'react-native';

import { cn } from '~lib/utils';

interface PressableProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto' | undefined;
  onPress?: (() => void) | null;
}

const Pressable = ({ children, className, disabled, pointerEvents, onPress }: PressableProps) => {
  return (
    <RNPressable
      pointerEvents={pointerEvents}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      className={`${className}`}
    >
      {({ pressed }) => <View className={cn(pressed && 'opacity-70')}>{children}</View>}
    </RNPressable>
  );
};

export default Pressable;
