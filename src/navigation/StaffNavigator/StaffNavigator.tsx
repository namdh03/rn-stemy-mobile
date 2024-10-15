import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StaffBottomTabNavigator from '~navigation/StaffBottomTabNavigator';
import { StaffStackParamList } from '~types/navigation.type';

const StaffStack = createNativeStackNavigator<StaffStackParamList>();

const StaffNavigator = () => (
  <StaffStack.Navigator>
    <StaffStack.Screen
      name='StaffBottomTabParamList'
      component={StaffBottomTabNavigator}
      options={{ headerShown: false }}
    />
  </StaffStack.Navigator>
);

export default StaffNavigator;
