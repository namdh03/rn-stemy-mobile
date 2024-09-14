import { Pressable, View } from 'react-native';

import { LogOut } from '~components/icons';
import { cn } from '~lib/utils';

const Logout = () => {
  return (
    <Pressable className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'>
      {({ pressed }) => (
        <View
          className={cn('flex-1 aspect-square pt-0.5 justify-center items-start web:px-5', pressed && 'opacity-70')}
        >
          <LogOut className='text-foreground' size={23} strokeWidth={1.25} />
        </View>
      )}
    </Pressable>
  );
};

export default Logout;
