import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';

const LoginWithGoogle = () => {
  return (
    <Button className='flex-row gap-[12px] items-center min-h-[44px]' variant='outline'>
      <Svg width={19} height={18} fill='none'>
        <G fillRule='evenodd' clipRule='evenodd'>
          <Path
            fill='#4285F4'
            d='M18.14 9.205c0-.639-.057-1.252-.164-1.841H9.5v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z'
          />
          <Path
            fill='#34A853'
            d='M9.5 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H1.457v2.332A8.997 8.997 0 0 0 9.5 18Z'
          />
          <Path
            fill='#FBBC05'
            d='M4.464 10.71A5.41 5.41 0 0 1 4.182 9c0-.593.102-1.17.282-1.71V4.958H1.457A8.997 8.997 0 0 0 .5 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z'
          />
          <Path
            fill='#EA4335'
            d='M9.5 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.963.891 11.926 0 9.5 0a8.997 8.997 0 0 0-8.043 4.958L4.464 7.29C5.172 5.163 7.156 3.58 9.5 3.58Z'
          />
        </G>
      </Svg>
      <Text className='font-inter-regular text-muted-foreground text-[16px] leading-[24px]'>Sign in with Google</Text>
    </Button>
  );
};

export default LoginWithGoogle;
