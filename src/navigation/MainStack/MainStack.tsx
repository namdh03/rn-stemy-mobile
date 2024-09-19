import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '~screens/HomeScreen';
import { BottomTabParamList } from '~types/navigation';

const Stack = createBottomTabNavigator<BottomTabParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
    </Stack.Navigator>
  );
}
