import { ScrollView, View } from 'react-native';

import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import { FeedbackProductScreenNavigationProps } from '~types/navigation.type';

const FeedbackProductScreen = ({ route, navigation }: FeedbackProductScreenNavigationProps) => {
  return (
    <ScrollView
      contentContainerClassName='flex-row pt-[25px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='flex-1 justify-center items-center'>
        <Text>Order ID: {route.params.orderId}</Text>
        <Button onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default FeedbackProductScreen;
