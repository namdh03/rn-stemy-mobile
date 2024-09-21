import { Text, View } from 'react-native';

import { ResetPasswordScreenNavigationProps } from '~types/navigation';

const ResetPasswordScreen = ({ route }: ResetPasswordScreenNavigationProps) => {
  console.log(route.params.token);

  return (
    <View>
      <Text>ResetPasswordScreen</Text>
    </View>
  );
};

export default ResetPasswordScreen;
