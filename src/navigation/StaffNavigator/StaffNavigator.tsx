import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pressable from '~components/customs/Pressable';
import { ChevronLeft } from '~components/icons';
import StaffBottomTabNavigator from '~navigation/StaffBottomTabNavigator';
import SupportTicketDetailScreen from '~screens/SupportTicketDetailScreen';
import { StaffStackParamList, SupportTicketDetailScreenNavigationProps } from '~types/navigation.type';

const StaffStack = createNativeStackNavigator<StaffStackParamList>();

const StaffNavigator = () => (
  <StaffStack.Navigator>
    <StaffStack.Screen
      name='StaffBottomTabParamList'
      component={StaffBottomTabNavigator}
      options={{ headerShown: false }}
    />
    <StaffStack.Screen
      name='SupportTicketDetailScreen'
      component={SupportTicketDetailScreen}
      options={({ navigation }: SupportTicketDetailScreenNavigationProps) => ({
        title: 'Ticket detail',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-primary' size={30} />
          </Pressable>
        ),
      })}
    />
  </StaffStack.Navigator>
);

export default StaffNavigator;
