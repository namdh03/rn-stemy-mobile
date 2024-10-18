import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderLeft from '~components/customs/MainHeaderLeft';
import StaffProfileScreen from '~screens/StaffProfileScreen';
import { StaffProfileStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<StaffProfileStackParamList>();

const StaffProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}
    >
      <Stack.Screen
        name='StaffProfileScreen'
        component={StaffProfileScreen}
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

export default StaffProfileStack;
