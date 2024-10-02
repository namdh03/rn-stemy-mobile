import { useEffect, useRef } from 'react';
import { Keyboard, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import BottomSheet from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';

import FlexibleImage from '~components/customs/FlexibleImage';
import LoadingOverlay from '~components/customs/LoadingOverlay';
import ProductList from '~components/customs/ProductList';
import { Star } from '~components/icons';
import { Button } from '~components/ui/button';
import { Separator } from '~components/ui/separator';
import { Text } from '~components/ui/text';
import { GET_PRODUCT_QUERY_KEY } from '~constants/product-query-key';
import execute from '~graphql/execute';
import { useColorScheme, useRefreshByUser } from '~hooks';
import { GetProductQuery } from '~services/product.services';
import { useStore } from '~store';
import { ProductDetailScreenNavigationProps } from '~types/navigation.type';

import AddCartBottomSheet from './components/AddCartBottomSheet';
import CategoryList from './components/CategoryList';
import Feedbacks from './components/Feedbacks';
import ImageCarousel from './components/ImageCarousel';

const ProductDetailScreen = ({ route }: ProductDetailScreenNavigationProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const setFeedbacks = useStore(useShallow((state) => state.setFeedbacks));
  const { data, refetch, isFetching } = useQuery({
    queryKey: [GET_PRODUCT_QUERY_KEY, route.params.id],
    queryFn: () => execute(GetProductQuery, { id: Number(route.params.id) }),
    select: (data) => data.data,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useEffect(() => {
    if (data) {
      setFeedbacks(data.product.rating, data.product.feedbacks);
    }
  }, [data]);

  const handleOpenAddToCart = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseAddToCart = () => {
    bottomSheetRef.current?.close();
  };

  const handleExpanseFullBottomSheet = () => {
    bottomSheetRef.current?.snapToPosition('100%');
  };

  if (isFetching) {
    return <LoadingOverlay loop />;
  }

  return (
    <>
      <ScrollView
        contentContainerClassName='pt-[25px] mx-auto w-full max-w-xl'
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        refreshControl={
          <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
        }
      >
        <Pressable onPress={Keyboard.dismiss}>
          <View className='px-[25px]'>
            <View className='flex-1 p-[10px] rounded-[10px] bg-muted'>
              <ImageCarousel images={data?.product.images || []} />
            </View>

            <View className='gap-[10px] mt-[30px]'>
              <Text className='font-inter-bold text-[24px] leading-[32px] tracking-[0.2px]'>{data?.product.name}</Text>
              <Text className='font-inter-medium text-[16px] text-[#FE3A30] leading-[20px] tracking-[0.2px]'>
                {data?.product.price.toLocaleString()} ₫
              </Text>
              <View className='flex-row items-center mt-[10px]'>
                <View className='flex-row items-center gap-[4px]'>
                  <Star color='#FFC120' size={16} className='fill-[#FFC120]' />
                  <Text className='font-inter-regular text-[14px] tracking-[0.2px]'>{data?.product.rating}</Text>
                </View>
                <Text className='font-inter-regular ml-[10px] text-[14px] tracking-[0.2px]'>
                  {data?.product.feedbacks.length || 0} Reviews
                </Text>
                <View className='ml-auto px-[10px] py-[2px] bg-[#EEFAF6] rounded-[10px]'>
                  <Text className='font-inter-medium text-primary text-[12px]'>Sold : {data?.product.sold}</Text>
                </View>
              </View>
            </View>

            <Separator className='mt-[30px] mb-[20px] bg-muted' />

            <View className='gap-[15px]'>
              <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
                Description Product
              </Text>

              {data?.product.categories && <CategoryList categories={data.product.categories || []} />}

              <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>
                {data?.product.description}
              </Text>
              {data?.product.images[0]?.url && (
                <FlexibleImage
                  source={{
                    uri: data.product.images[0].url || '',
                  }}
                />
              )}

              <Text className='font-inter-bold text-foreground text-[16px] leading-[24px] tracking-[0.2px]'>
                Detailed instruction book
              </Text>
              <Text className='font-inter-regular text-foreground text-[14px] leading-[22px] tracking-[0.2px]'>
                Included with the <Text className='font-inter-medium text-primary'>{data?.product.name}</Text> is a
                detailed programming guide, featuring multiple lessons with illustrations, sample code, and step-by-step
                instructions from A to Z.
              </Text>
            </View>

            <Separator className='mt-[40px] mb-[30px] bg-muted' />

            <Feedbacks />
          </View>

          <View className={`rounded-t-[10px] ${isDarkColorScheme ? 'bg-secondary' : 'bg-destructive-foreground'}`}>
            <ProductList hiddenProductId={route.params.id} title='Featured Product' data={data?.products.items || []} />
          </View>

          <View
            className={`flex-row gap-[20px] px-[25px] pt-[12px] pb-[25px] ${isDarkColorScheme ? 'bg-secondary' : 'bg-destructive-foreground'}`}
          >
            <Button className='flex-1' size='lg' variant='destructive'>
              <Text className='font-inter-medium text-white leading-[20px]'>Buy Now</Text>
            </Button>

            <Button className='flex-1' size='lg' onPress={handleOpenAddToCart}>
              <Text className='font-inter-medium text-white leading-[20px]'>Add to Cart</Text>
            </Button>
          </View>
        </Pressable>
      </ScrollView>

      <AddCartBottomSheet
        ref={bottomSheetRef}
        defaultPrice={data?.product.price || 0}
        labPrice={data?.product.lab?.price || 0}
        onFocus={handleExpanseFullBottomSheet}
        onClose={handleCloseAddToCart}
      />
    </>
  );
};

export default ProductDetailScreen;
