import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';

interface LoadingOverlayProps {
  message?: string;
  loop?: boolean;
}

function LoadingOverlay({ message, loop = false }: LoadingOverlayProps) {
  const [animatedValues, setAnimatedValues] = useState<Animated.Value[]>([]);

  useEffect(() => {
    if (message) {
      const newAnimatedValues = message.split('').map(() => new Animated.Value(1));
      setAnimatedValues(newAnimatedValues);
    } else {
      setAnimatedValues([]);
    }
  }, [message]);

  useEffect(() => {
    if (!message || animatedValues.length === 0) return;

    const animations = animatedValues.map((animatedValue, index) =>
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 500,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    const animationSequence = Animated.stagger(100, animations);

    if (loop) {
      Animated.loop(animationSequence).start();
    } else {
      animationSequence.start();
    }

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [message, loop, animatedValues]);

  return (
    <View className='bg-card flex-1 gap-[8px] justify-center items-center'>
      <ActivityIndicator size='large' className='text-primary' />
      {message && (
        <View style={{ flexDirection: 'row' }}>
          {message.split('').map((char, index) => (
            <Animated.Text
              key={`${char}-${index}`}
              style={{
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: animatedValues[index]
                      ? animatedValues[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [10, 0],
                        })
                      : 0,
                  },
                ],
              }}
              className='font-jaro-regular text-foreground text-[20px]'
            >
              {char}
            </Animated.Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default LoadingOverlay;
