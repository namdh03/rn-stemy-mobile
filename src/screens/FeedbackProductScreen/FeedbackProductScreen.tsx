import { useLayoutEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import FeedbackProduct from '~components/customs/FeedbackProduct';
import Pressable from '~components/customs/Pressable';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { CreateFeedbackMutation } from '~services/feedback.services';
import { FeedbackProductScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';
import showDialogSuccess from '~utils/showDialogSuccess';

const FeedbackProductScreen = ({ route, navigation }: FeedbackProductScreenNavigationProps) => {
  const { order } = route.params;
  const queryClient = useQueryClient();

  // State lưu tất cả feedbacks
  const [feedbacks, setFeedbacks] = useState<{
    [key: number]: {
      orderItemId: number;
      rating: number;
      note: string;
    };
  }>({});

  // Mutation để gửi nhiều feedbacks
  const { mutateAsync, error } = useMutation({
    mutationFn: (variables: { orderId: number; input: Array<{ orderItemId: number; rating: number; note: string }> }) =>
      execute(CreateFeedbackMutation, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [constants.HOME_QUERY_KEY.GET_HOME_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [constants.ORDER_QUERY_KEY.GET_COUNT_ORDER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [constants.ORDER_QUERY_KEY.GET_ORDER_BY_STATUS_QUERY_KEY] });
      showDialogSuccess({ textBody: 'Feedbacks submitted successfully!' });
      navigation.goBack();
    },
    onError: (errors) => {
      if (isErrors(errors)) {
        showDialogError();
      } else {
        showDialogError({ textBody: errors.message });
      }
    },
  });

  console.log(error);

  // Hàm xử lý khi feedback thay đổi
  const handleFeedbackChange = (orderItemId: string, rating: number, note: string) => {
    setFeedbacks((prev) => ({
      ...prev,
      [orderItemId]: { orderItemId: parseInt(orderItemId), rating, note },
    }));
  };

  // Hàm gửi tất cả feedbacks
  const handleSubmitFeedbacks = async () => {
    const feedbackArray = Object.values(feedbacks);

    try {
      await mutateAsync({
        orderId: parseFloat(order.id), // Truyền orderId
        input: feedbackArray, // Truyền mảng feedbacks
      });

      console.log('All feedbacks submitted:', feedbackArray);
      showDialogSuccess();
    } catch (errors) {
      console.log(errors);
      showDialogError();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSubmitFeedbacks}>
          <Text className='font-inter-medium text-primary text-[18px]'>Submit</Text>
        </Pressable>
      ),
    });
  }, [handleSubmitFeedbacks, navigation]);

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
            image={{ uri: item.product.images[0]?.url }}
            name={item.product.name}
            hasLab={item.hasLab}
            onFeedbackChange={(rating, note) => handleFeedbackChange(item.id, rating, note)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FeedbackProductScreen;
