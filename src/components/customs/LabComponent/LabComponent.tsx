import React from 'react';
import { ImageSourcePropType, Platform, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { shareAsync } from 'expo-sharing';

import { Download } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Button } from '~components/ui/button';
import constants from '~constants';
import { LAB_MESSAGES } from '~constants/messages';
import { downloadFilePFD } from '~services/lab.services';

export interface LabComponentProps {
  id: string;
  imageUrl: ImageSourcePropType | string;
  title: string;
  purchaseDate: Date;
  numberOfTicket: number;
  status: boolean;
  activeDate?: Date;
  fileLink: string;
}

const LabComponent = ({
  imageUrl,
  title,
  purchaseDate,
  numberOfTicket,
  status,
  activeDate,
  fileLink,
}: LabComponentProps) => {
  const onDownloadFile = async () => {
    const filename = title;

    try {
      // const response = await downloadFilePFD(fileLink);
      // // Handle the response, e.g., show a success message, save the file, etc.
      // console.log('File downloaded successfully', response);
      const result = await FileSystem.downloadAsync(
        `https://stemyb.thanhf.dev/download/${fileLink}`,
        FileSystem.documentDirectory + filename,
      );
      console.log('result', result);
      save(result.uri, filename, response.headers['content-type']);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error downloading the file', error);
    }
  };

  const save = async (uri: string, filename: string, mimetype) => {
    if (Platform.OS === 'android') {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

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
          {activeDate ? `Active day: ${activeDate.toLocaleDateString()}` : LAB_MESSAGES.INACTIVE_LAB}
        </Text>
        {activeDate && (
          <View className='w-full flex-row items-center justify-end mt-[6px]'>
            <View>
              <Text className='font-inter-semiBold w-[150px] text-[14px]'> File Lab instruction: </Text>
            </View>
            <Button className=' w-[120px] p-[8px] rounded-[10px] flex-row items-center ' onPress={onDownloadFile}>
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
