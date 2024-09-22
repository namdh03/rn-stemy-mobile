import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';

interface LoadingOverlayProps {
  message?: string;
  loop?: boolean;
}

function LoadingOverlay({ message, loop = false }: LoadingOverlayProps) {
  const animatedValues = useRef<Animated.Value[]>([]).current;

  if (animatedValues.length === 0 && message) {
    message.split('').forEach(() => {
      animatedValues.push(new Animated.Value(0));
    });
  }

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }),
    );

    const animationSequence = Animated.stagger(100, animations);

    if (loop) {
      Animated.loop(
        Animated.sequence([
          animationSequence,
          Animated.delay(500),
          Animated.stagger(
            100,
            animatedValues.map((animatedValue) =>
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
            ),
          ),
        ]),
      ).start();
    } else {
      animationSequence.start();
    }
  }, [message, loop]);

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
                    translateY: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
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
