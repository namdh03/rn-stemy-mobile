import { ScrollView, Text as RNText, View } from 'react-native';
import { Image } from 'expo-image';

import images from '~assets/images';
import { Button } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Text } from '~components/ui/text';
import constants from '~constants';
import { OrderSuccessScreenNavigationProps } from '~types/navigation.type';

const OrderSuccessScreen = ({ route, navigation }: OrderSuccessScreenNavigationProps) => {
  return (
    <ScrollView
      contentContainerClassName='p-[24px] py-[50px] mx-auto w-full max-w-xl'
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
    >
      <Card className='mt-[124px] px-[45px] pt-[24px] pb-[16px]'>
        <View className='gap-[17px] items-center'>
          <Image
            source={images.orderSuccess}
            placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
            style={{ width: 184, height: 125 }}
            contentFit='cover'
          />
          <Text className='font-inter-semiBold text-center text-foreground text-[16px] leading-[18px] tracking-[-0.112px]'>
            You paid {(route.params.totalPrice / 100).toLocaleString()} ₫
          </Text>
          <Text className='font-inter-regular text-muted-foreground text-[12px] leading-[14px]'>
            Keep track your order at
            <Text className='font-inter-regular text-primary text-[12px] leading-[14px]'> My Purchases</Text>
          </Text>
        </View>

        <View className='flex-row items-center gap-[18px] mt-[16px]'>
          <Button
            className='w-1/2'
            variant='outline'
            onPress={() =>
              navigation.navigate('BottomTabStack', {
                screen: 'HomeStack',
                params: {
                  screen: 'HomeScreen',
                },
              })
            }
          >
            <RNText className='text-foreground text-[14px]'>Home</RNText>
          </Button>
          <Button className='w-1/2'>
            <RNText className='text-muted text-[14px]'>My Purchase</RNText>
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

export default OrderSuccessScreen;
