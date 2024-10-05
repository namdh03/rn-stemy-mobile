import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainHeaderRight from '~components/customs/MainHeaderRight';
import Pressable from '~components/customs/Pressable';
import { ChevronLeft, Star } from '~components/icons';
import { Text } from '~components/ui/text';
import { useThrottle } from '~hooks';
import ProductDetailScreen from '~screens/ProductDetailScreen';
import ProductFeedbackScreen from '~screens/ProductFeedbackScreen';
import {
  ProductDetailScreenNavigationProps,
  ProductDetailStackParamList,
  ProductFeedbackScreenNavigationProps,
} from '~types/navigation.type';

const ProductDetailStack = createNativeStackNavigator<ProductDetailStackParamList>();

const ProductDetailNavigator = () => (
  <ProductDetailStack.Navigator>
    <ProductDetailStack.Screen
      name='ProductDetailScreen'
      component={ProductDetailScreen}
      options={({ navigation }: ProductDetailScreenNavigationProps) => ({
        headerTitle: 'Detail Product',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
        headerLeft: ({ canGoBack }) => (
          <Pressable onPress={useThrottle(() => canGoBack && navigation.goBack(), 500)}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
        headerRight: () => <MainHeaderRight />,
      })}
    />
    <ProductDetailStack.Screen
      name='ProductFeedbackScreen'
      component={ProductFeedbackScreen}
      options={({ route, navigation }: ProductFeedbackScreenNavigationProps) => ({
        headerTitle: 'Review Product',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Inter_18pt-SemiBold',
          fontSize: 18,
        },
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeft className='text-foreground' size={30} />
          </Pressable>
        ),
        headerRight: () => (
          <View className='flex-row items-center gap-[4px]'>
            <Star color='#FFC120' size={18} className='fill-[#FFC120]' />
            <Text className='font-inter-medium text-[16px] tracking-[0.2px]'>{route.params.rating}</Text>
          </View>
        ),
      })}
    />
  </ProductDetailStack.Navigator>
);

export default ProductDetailNavigator;
