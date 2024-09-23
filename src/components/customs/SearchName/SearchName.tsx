import { useState } from 'react';
import { View } from 'react-native';

import { Search } from '~components/icons';
import { Input } from '~components/ui/input';

const SearchName = () => {
  const [value, setValue] = useState('');

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <View className='relative w-[325px] h-[50px]'>
      <Input
        placeholder='Search Product Name'
        value={value}
        onChangeText={onChangeText}
        aria-labelledby='inputLabel'
        className='bg-muted rounded-[10px] border-muted pl-[20px] pr-[54px] py-[16xp] placeholder:text-muted-foreground placeholder:font-inter-medium placeholder:text-[14px]'
      />
      <View className='absolute top-[11px] right-[20px]'>
        <Search className='text-foreground' size={20} />
      </View>
    </View>
  );
};

export default SearchName;
