import React from 'react';
import { FlatList, View } from 'react-native';

import { LabComponentProps } from '~components/customs/LabComponent/LabComponent';
import LabList from '~components/customs/LabList';
import SearchName from '~components/customs/SearchName';

const dummyData = {
  orderId: '286598516',
  lab: [
    {
      id: '1',
      imageUrl: 'https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?rs=1&pid=ImgDetMain',
      title: 'Lab 1',
      purchaseDate: new Date(),
      numberOfTicket: 3,
      status: true,
      fileLink: 'https://www.google.com',
      activeDate: new Date(),
    },
    {
      id: '2',
      imageUrl: 'https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?rs=1&pid=ImgDetMain',
      title: 'Lab 2',
      purchaseDate: new Date(),
      numberOfTicket: 0,
      status: false,
      activeDate: undefined,
      fileLink: 'https://www.google.com',
      message: 'You have 1 ticket left',
    },
    {
      id: '3',
      imageUrl: 'https://th.bing.com/th/id/OIP.CBFZpMOFqyCjyHOJxouwVAHaE8?rs=1&pid=ImgDetMain',
      title: 'Lab 3',
      purchaseDate: new Date(),
      numberOfTicket: 1,
      status: true,
      fileLink: 'https://www.google.com',
    },
  ],
};
const dummyOrder = [{ ...dummyData }, { ...dummyData }, { ...dummyData }];
type getLabListQuery = {
  orderId: string;
  lab: LabComponentProps[];
};

const MyPurchasesScreen = () => {
  const renderItem = ({ item }: { item: getLabListQuery }) => {
    return (
      <View className='w-full'>
        <LabList data={item} />
      </View>
    );
  };

  return (
    <View className='flex-1 w-full max-w-xl bg-muted '>
      <View className='px-[25px]'>
        <SearchName
          editable={false}
          placeholder='Search Product Name or Order ID'
          // onContainerPress={handleNavigateToSearchOrder}
          active
        />
      </View>

      <FlatList
        data={dummyOrder}
        renderItem={renderItem}
        // keyExtractor={(item) => item.orderId}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MyPurchasesScreen;
