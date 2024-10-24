import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import DeliveryScreen from '~screens/DeliveryScreen';
import { DeliveryStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<DeliveryStackParamList>();

const DeliveryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}
    >
      <Stack.Screen
        name='DeliveryScreen'
        component={DeliveryScreen}
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

export default DeliveryStack;
