import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { storage } from '~utils/mmkv-storage';

import './global.css';

export default function App() {
  storage.set('test', 'ABC_XYZ');
  console.log(storage.getString('test'));

  return (
    <View className='flex-1 justify-center items-center bg-gray-500'>
      <Text className='text-center text-4xl color-yellow-500'>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}
