import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import SupportScreen from '~screens/SupportScreen';
import { SupportStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<SupportStackParamList>();

const SupportStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}
    >
      <Stack.Screen
        name='SupportScreen'
        component={SupportScreen}
        options={() => ({
          headerLeft: () => <MainHeaderLeft />,
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

export default SupportStack;
