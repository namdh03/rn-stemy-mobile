import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft, ListFilter } from '~components/icons';
import StoresScreen from '~screens/StoresScreen';
import { StoresScreenNavigationProps, StoresStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<StoresStackParamList>();

const StoresStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='StoresScreen'
        component={StoresScreen}
        options={({ navigation }: StoresScreenNavigationProps) => ({
          title: 'Store',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <ChevronLeft className='text-foreground' size={30} />
            </Pressable>
          ),
          headerRight: () => (
            <View className='flex-row gap-[18px]'>
              <MainHeaderRight />
              <ListFilter className='text-foreground' size={26} />
            </View>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 24,
          },
          headerRightContainerStyle: {
            paddingRight: 24,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default StoresStack;
