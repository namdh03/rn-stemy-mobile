import { MoonStar, Sun } from '~components/icons';
import { useColorScheme } from '~hooks';
import { setAndroidNavigationBar } from '~lib/android-navigation-bar';
import { storage } from '~utils/mmkv-storage';

import Pressable from '../Pressable';

export default function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        storage.set('theme', newTheme);
      }}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {isDarkColorScheme ? (
        <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
      ) : (
        <Sun className='text-foreground' size={24} strokeWidth={1.25} />
      )}
    </Pressable>
  );
}
