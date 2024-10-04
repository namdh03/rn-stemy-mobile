import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import MainHeaderRight from '~components/customs/MainHeaderRight';
import MeScreen from '~screens/MeScreen';
import { MeStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<MeStackParamList>();

const MeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}
    >
      <Stack.Screen
        name='MeScreen'
        component={MeScreen}
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

export default MeStack;
