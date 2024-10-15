import { ScrollView, View } from 'react-native';

import FeedbackProduct from '~components/customs/FeedbackProduct';
import { FeedbackProductScreenNavigationProps } from '~types/navigation.type';

const FeedbackProductScreen = ({ route }: FeedbackProductScreenNavigationProps) => {
  console.log(JSON.stringify(route.params));

  const { order } = route.params;

  return (
    <ScrollView
      contentContainerClassName='flex-row mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <View className='flex-1 justify-center items-center bg-muted'>
        {order.orderItems.map((item) => (
          <FeedbackProduct
            key={item.id}
            image={{ uri: item.product.images[0].url }}
            name={item.product.name}
            hasLab={item.hasLab}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FeedbackProductScreen;
//  w-[375px]
