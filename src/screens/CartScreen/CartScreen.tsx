import React from 'react';
import { FlatList, View } from 'react-native';

import { Separator } from '~components/ui/separator';

import CartItem from './components/CartItem';

const CartScreen = () => {
  const data = [
    {
      id: '1',
      quantity: 2,
      product: {
        name: 'Wireless Headphones',
        price: 59.99,
        images: [
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
        ],
      },
    },
    {
      id: '2',
      quantity: 1,
      product: {
        name: 'Smartphone',
        price: 499.99,
        images: [
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
        ],
      },
    },
    {
      id: '3',
      quantity: 3,
      product: {
        name: 'Laptop',
        price: 899.99,
        images: [
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
        ],
      },
    },
    {
      id: '4',
      quantity: 4,
      product: {
        name: 'Bluetooth Speaker',
        price: 29.99,
        images: [
          {
            url: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/449398803_2093052561080477_2300978068388066873_n.jpg?stp=dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFaztWFMtjQ0vXL4EiPeGuOwvgrnrYy5wTC-CuetjLnBG8Lav48hpnFw7cir5h7_JFP5j4YoKBvlsTGi2Lx75Iv&_nc_ohc=hropB7U5nBUQ7kNvgEXsGFA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AYBGmH7U_55PbisqMx78koomWZ7-4X99jnxNS1I8BFwoDA&oe=66FC273A',
          },
        ],
      },
    },
  ];

  return (
    <View style={{ padding: 24 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        ItemSeparatorComponent={() => <Separator className='my-[12px]' />}
      />
    </View>
  );
};

export default CartScreen;
