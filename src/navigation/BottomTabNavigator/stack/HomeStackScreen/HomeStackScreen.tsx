import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import HomeScreen from '~screens/HomeScreen';
import { HomeStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}
    >
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={() => ({
          headerLeft: () => <MainHeaderLeft />,
          headerRight: () => <MainHeaderRight />,
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

export default HomeStack;
