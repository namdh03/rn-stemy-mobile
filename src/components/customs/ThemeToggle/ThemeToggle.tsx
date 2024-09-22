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
    >
      {isDarkColorScheme ? (
        <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
      ) : (
        <Sun className='text-foreground' size={24} strokeWidth={1.25} />
      )}
    </Pressable>
  );
}
