import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StaffBottomTabs from '~navigation/StaffBottomTabs';
import SupportTicketDetailScreen from '~screens/SupportTicketDetailScreen';
import { StaffStackParamList } from '~types/navigation.type';

const Stack = createNativeStackNavigator<StaffStackParamList>();

const StaffStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='StaffBottomTabs' component={StaffBottomTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name='SupportTicketDetailScreen'
        component={SupportTicketDetailScreen}
        options={{
          title: 'Ticket detail',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Inter_18pt-SemiBold',
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StaffStack;
