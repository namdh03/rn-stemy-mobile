import { useCallback, useRef } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { NotifyOnChangeProps } from '@tanstack/query-core';

export default function useFocusNotifyOnChangeProps(notifyOnChangeProps?: NotifyOnChangeProps) {
  const focusedRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      focusedRef.current = true;

      return () => {
        focusedRef.current = false;
      };
    }, []),
  );

  return {
    notifyOnChangeProps: () =>
      !focusedRef.current
        ? []
        : typeof notifyOnChangeProps === 'function'
          ? notifyOnChangeProps()
          : notifyOnChangeProps,
    isFocused: focusedRef.current,
  };
}
