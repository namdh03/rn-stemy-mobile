import React from 'react';
import { ImageSourcePropType, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Download } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Button } from '~components/ui/button';
import constants from '~constants';

export interface LabComponentProps {
  id: string;
  imageUrl: ImageSourcePropType | string;
  title: string;
  purchaseDate: Date;
  numberOfTicket: number;
  status: boolean;
  activeDate?: Date;
  message?: string;
  fileLink: string;
}

const LabComponent = ({
  imageUrl,
  title,
  purchaseDate,
  numberOfTicket,
  status,
  activeDate,
  message,
}: LabComponentProps) => {
  return (
    <View className='w-full px-[16px] py-[16px] rounded-[6px] bg-white shadow-md border-black'>
      <View className='flex-row justify-between'>
        <View className='flex-row'>
          <Image
            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
            placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
            style={{ width: 68, height: 72, alignSelf: 'center', borderRadius: 4 }}
            contentFit='cover'
          />
          <View className='ml-[16px]'>
            <Text numberOfLines={1} className='font-inter-semiBold text-[16px] mb-[4px]'>
              {title}
            </Text>
            <Text className='font-inter-medium mb-[4px] text-[12px] '>{purchaseDate.toLocaleDateString()}</Text>
            <Text className='font-inter-regular mb-[4px] text-[12px] '>Ticket: {numberOfTicket}/3</Text>
          </View>
        </View>
        <View>
          <Badge variant={'outline'} className={`border-${status ? 'primary' : 'muted-foreground'}`}>
            <Text className={`font-inter-regular text-${status ? 'primary' : 'muted-foreground'} text-[12px]`}>
              {status ? 'Active' : 'Inactive'}
            </Text>
          </Badge>
        </View>
      </View>
      <View className=' border-b border-muted my-3' />

      <View className='w-full'>
        <Text className='font-inter-regular text-[12px] text-muted-foreground'>
          {activeDate ? `Active day: ${activeDate.toLocaleDateString()}` : message}
        </Text>
        {activeDate && (
          <View className='w-full flex-row items-center justify-end mt-[6px]'>
            <View>
              <Text className='font-inter-semiBold w-[150px] text-[14px]'> File Lab instruction: </Text>
            </View>
            <Button className=' w-[120px] p-[8px] rounded-[10px] flex-row items-center '>
              <Text className='font-inter-semiBold text-[12px] text-white'>Download</Text>
              <Download className='text-background ml-[8px]' size={16} strokeWidth={2.5} />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default LabComponent;
