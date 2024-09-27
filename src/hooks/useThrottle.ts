import { useCallback, useRef } from 'react';

export default function useThrottle(callback: () => void, delay: number) {
  const lastCallRef = useRef<number>(0);

  const throttledCallback = useCallback(() => {
    const now = Date.now();

    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback();
    }
  }, [callback, delay]);

  return throttledCallback;
}
