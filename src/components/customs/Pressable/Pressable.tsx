import { ReactNode } from 'react';
import { Pressable as RNPressable, View } from 'react-native';

import { cn } from '~lib/utils';

interface PressableProps {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
}

const Pressable = ({ children, className, onPress }: PressableProps) => {
  return (
    <RNPressable
      onPress={onPress}
      className={`web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 ${className}`}
    >
      {({ pressed }) => (
        <View className={cn('flex-1 pt-0.5 justify-center items-start web:px-5', pressed && 'opacity-70')}>
          {children}
        </View>
      )}
    </RNPressable>
  );
};

export default Pressable;
