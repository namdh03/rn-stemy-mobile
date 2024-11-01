import { RefreshControl, ScrollView, View } from 'react-native';

import { useQuery } from '@tanstack/react-query';

import images from '~assets/images';
import Banner from '~components/customs/Banner';
import Carousel from '~components/customs/Carousel';
import CategoriesList from '~components/customs/CategoriesList';
import ProductList from '~components/customs/ProductList';
import SearchName from '~components/customs/SearchName';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useColorScheme, useRefreshByUser } from '~hooks';
import { GetHomeQuery } from '~services/home.services';
import { HomeScreenNavigationProps } from '~types/navigation.type';

const HomeScreen = ({ navigation }: HomeScreenNavigationProps) => {
  const { isDarkColorScheme } = useColorScheme();
  const { data, refetch } = useQuery({
    queryKey: [constants.HOME_QUERY_KEY.GET_HOME_QUERY_KEY],
    queryFn: () => execute(GetHomeQuery),
    select: (data) => data.data,
  });

  const handleNavigateToStores = () => {
    navigation.navigate('StoresScreen');
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      refreshControl={
        <RefreshControl className='text-primary' refreshing={isRefetchingByUser} onRefresh={refetchByUser} />
      }
    >
      <View className='w-full px-[25px]'>
        <SearchName
          editable={false}
          placeholder='Search Product Name'
          onContainerPress={() => {
            navigation.navigate('SearchProductScreen');
          }}
        />
      </View>
      <Carousel />
      <View className='mb-[50px] px-[25px]'>
        <Text className='mt-[17px] font-inter-medium text-[16px] color-foreground leading-[25px] tracking-[0.061px]'>
          Categories
        </Text>
        <View className='flex-row inline-flex items-center justify-between pt-[15px]'>
          <CategoriesList />
        </View>
      </View>
      <View className={`${isDarkColorScheme ? 'bg-secondary' : 'bg-destructive-foreground'}`}>
        <ProductList
          onPress={handleNavigateToStores}
          title='Featured Product'
          data={data?.featuredProduct.items || []}
        />

        <Banner imageUrl={images.bannerA} onPress={handleNavigateToStores} />

        <ProductList onPress={handleNavigateToStores} title='Best Sellers' data={data?.bestSellers.items || []} />

        <Banner imageUrl={images.bannerB} onPress={handleNavigateToStores} />

        <ProductList onPress={handleNavigateToStores} title='New Arrivals' data={data?.newArrivals.items || []} />

        <ProductList
          onPress={handleNavigateToStores}
          title='Top Rated Product'
          data={data?.topRatedProduct.items || []}
        />

        <ProductList onPress={handleNavigateToStores} title='Special Offers' data={data?.specialOffers.items || []} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
