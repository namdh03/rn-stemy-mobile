import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Search } from '~components/icons';
import { Input } from '~components/ui/input';
import { cn } from '~lib/utils';

interface SearchNameProps {
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  onPress?: () => void;
}

const SearchName = ({ value, onChangeText, editable, onPress }: SearchNameProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable className='relative w-[335px] h-[50px] mt-[25px]' onPress={onPress}>
      <Input
        editable={editable}
        placeholder='Search Product Name'
        aria-labelledby='inputLabel'
        pointerEvents='none'
        style={{ opacity: 1 }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'rounded-[10px] pl-[20px] pr-[54px] py-[16xp] text-[16px] text-foreground leading-[18px] placeholder:text-muted-foreground placeholder:font-inter-medium placeholder:text-[14px]',
          {
            'bg-destructive-foreground border-transparent ': isFocused,
            'bg-muted border-muted': !isFocused,
          },
        )}
        value={value}
        onChangeText={onChangeText}
      />
      <View className='absolute top-[11px] right-[20px]'>
        <Search className='text-foreground' size={20} />
      </View>
    </Pressable>
  );
};

export default SearchName;
