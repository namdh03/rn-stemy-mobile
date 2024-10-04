import { View } from 'react-native';

import SearchName from '~components/customs/SearchName';

const MyOrdersScreen = () => {
  const handleNavigateToSearchOrder = () => {};

  return (
    <View className='flex-1 gap-[20px] px-[25px] mx-auto w-full max-w-xl'>
      <SearchName
        editable={false}
        placeholder='Search Product Name or Order ID'
        // value={storesFilterSorting.search}
        onContainerPress={handleNavigateToSearchOrder}
      />
    </View>
  );
};

export default MyOrdersScreen;
