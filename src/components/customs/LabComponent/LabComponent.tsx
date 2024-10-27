import React, { useCallback, useRef } from 'react';
import { Alert, Animated, ImageSourcePropType, Platform, Text, View } from 'react-native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { Swipeable } from 'react-native-gesture-handler';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { shareAsync } from 'expo-sharing';

import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Copy, Download } from '~components/icons';
import { Badge } from '~components/ui/badge';
import { Button } from '~components/ui/button';
import configs from '~configs';
import constants from '~constants';
import { LAB_MESSAGES } from '~constants/messages';
import { MainStackParamList } from '~types/navigation.type';
import { getAccessToken } from '~utils/token-storage';

import Pressable from '../Pressable';

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
  id,
  imageUrl,
  title,
  purchaseDate,
  numberOfTicket,
  status,
  activeDate,
  fileLink,
}: LabComponentProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const swipeableRowRef = useRef<Swipeable>(null);

  const handleNavigateToCreateTicket = useCallback(() => {
    swipeableRowRef.current?.close(); // Close swipeable row before navigation
    navigation.navigate('CreateTicketScreen', {
      orderItemId: id,
    });
  }, [navigation, id]);
  const renderRightAction = (text: string, x: number, progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Pressable className='flex-1 items-center justify-center bg-primary' onPress={handleNavigateToCreateTicket}>
          <Text className='font-inter-regular text-background text-[14px]'>{text}</Text>
        </Pressable>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => (
    <View style={{ width: 66, flexDirection: 'row' }}>{renderRightAction('Create Ticket', 66, progress)}</View>
  );

  const onDownloadFile = async () => {
    try {
      const token = getAccessToken();
      if (!token) return;

      const filename = title;
      const result: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(
        `${configs.env.EXPO_PUBLIC_API_URL}/download/${fileLink}`,
        FileSystem.documentDirectory + filename,
        {
          headers: {
            Authorization: token,
            Accept: 'application/pdf',
          },
        },
      );
      save(result.uri, filename, result.headers['Content-Type']);
      Alert.alert('Download Successful', `The file ${filename} has been downloaded successfully.`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert('Download Failed', 'An error occurred while downloading the file.');
    }
  };

  const save = async (uri: string, filename: string, mimetype: string = 'application/pdf') => {
    if (Platform.OS === 'android') {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype).then(
          async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
          },
        );
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const handleCopyOrderId = () => {
    Clipboard.setString(btoa(btoa(btoa(btoa(id)))));
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
      textBody: constants.MESSAGES.ORDER_MESSAGES.COPY_ORDER_PRODUCT_ID,
      autoClose: 1000,
    });
  };

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={numberOfTicket <= 3 ? (progress) => renderRightActions(progress) : undefined}
      overshootRight={false}
    >
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
              <Text className={`font-inter-regular mb-[4px] text-[12px] ${numberOfTicket > 3 ? 'text-red-500' : ''}`}>
                Ticket: {numberOfTicket}/3
              </Text>
              <Pressable onPress={handleCopyOrderId}>
                <Text className='font-inter-regular mb-[8px] text-[12px] text-muted-foreground'>
                  ID: {btoa(btoa(btoa(btoa(id))))}
                  <Copy className='text-muted-foreground' size={16} strokeWidth={2} />
                </Text>
              </Pressable>
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
    </Swipeable>
  );
};

export default LabComponent;
