import React from 'react';
import { Text, View } from 'react-native';

import { CreateTicketScreenNavigationProps } from '~types/navigation.type';

const CreateTicketScreen = ({ route }: CreateTicketScreenNavigationProps) => {
  return (
    <View>
      <Text>CreateTicketScreen</Text>
      <Text>{route.params.orderItemId}</Text>
    </View>
  );
};

export default CreateTicketScreen;
