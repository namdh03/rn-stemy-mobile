import { FC, useCallback, useLayoutEffect, useState } from 'react';

import { Input } from '~components/ui/input';

interface InputPositiveNumberProps {
  value: number;
  onChange: (value: number) => void;
  onFocus?: () => void;
  min?: number;
  max?: number;
  className?: string;
}

const InputPositiveNumber: FC<InputPositiveNumberProps> = ({
  value,
  onChange,
  onFocus,
  min = 1,
  max = 99,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useLayoutEffect(() => {
    // Only update inputValue if it's different from the current value
    if (inputValue !== value.toString()) {
      handleInputChange(value.toString());
    }
  }, [value]);

  const handleValueChange = useCallback(
    (newValue: number) => {
      const clampedValue = Math.min(Math.max(newValue, min), max);
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    },
    [onChange, min, max],
  );

  const handleInputChange = useCallback(
    (text: string) => {
      const numericValue = text.replace(/[^0-9]/g, '');

      if (numericValue === '') {
        setInputValue('');
        return;
      }

      const newValue = parseInt(numericValue, 10);
      handleValueChange(newValue);
    },
    [handleValueChange],
  );

  const handleEndEditing = useCallback(() => {
    if (inputValue === '' || parseInt(inputValue, 10) === 0) {
      handleValueChange(min);
    } else {
      const finalValue = parseInt(inputValue, 10);
      handleValueChange(finalValue);
    }
  }, [inputValue, handleValueChange, min]);

  return (
    <Input
      keyboardType='number-pad'
      className={className}
      value={inputValue}
      onChangeText={handleInputChange}
      onEndEditing={handleEndEditing}
      onFocus={onFocus}
    />
  );
};

export default InputPositiveNumber;
