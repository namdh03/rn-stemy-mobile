import { View } from 'react-native';

import SearchName from '~components/customs/SearchName';
import { MyOrdersScreenNavigationProps } from '~types/navigation.type';

const MyOrdersScreen = ({ navigation }: MyOrdersScreenNavigationProps) => {
  const handleNavigateToSearchOrder = () => {
    navigation.navigate('SearchOrdersScreen');
  };

  return (
    <View className='flex-1 gap-[20px] px-[25px] mx-auto w-full max-w-xl'>
      <SearchName
        editable={false}
        placeholder='Search Product Name or Order ID'
        onContainerPress={handleNavigateToSearchOrder}
      />
    </View>
  );
};

export default MyOrdersScreen;
