import * as React from 'react';
import { View } from 'react-native';

import { FormInput, FormItemProps } from '~components/deprecated-ui/form';
import { Input } from '~components/deprecated-ui/input';
import { Eye, EyeOff } from '~components/icons';

import Pressable from '../Pressable';

const InputPassword = React.forwardRef<React.ElementRef<typeof Input>, FormItemProps<typeof Input, string>>(
  ({ placeholder, ...props }, ref) => {
    const [isPasswordShow, setIsPasswordShow] = React.useState(false);

    const togglePassword = () => setIsPasswordShow((preState) => !preState);

    return (
      <View className='relative'>
        <FormInput
          ref={ref}
          className='font-inter-regular h-[48px] pl-[16px] pr-[48px] py-[12px]'
          placeholder={placeholder}
          secureTextEntry={!isPasswordShow}
          autoComplete='off'
          {...props}
        />

        <Pressable onPress={togglePassword} className='absolute top-[12px] right-[16px]'>
          {isPasswordShow ? (
            <Eye className='text-foreground' size={23} strokeWidth={1.25} />
          ) : (
            <EyeOff className='text-foreground' size={23} strokeWidth={1.25} />
          )}
        </Pressable>
      </View>
    );
  },
);

export default InputPassword;
