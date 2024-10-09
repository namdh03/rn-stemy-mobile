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
      className={`web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 ${className}`}
    >
      {({ pressed }) => (
        <View className={cn('pt-0.5 justify-center items-start web:px-5', pressed && 'opacity-70')}>{children}</View>
      )}
    </RNPressable>
  );
};

export default Pressable;
