/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import PreviewImage from '~components/customs/PreviewImage';
import { ChevronsUpDown } from '~components/icons';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useUploadImage } from '~hooks';
import { GetCreateTicketQuery } from '~services/ticket.services';
import { CreateTicketScreenNavigationProps } from '~types/navigation.type';

import { CreateTicketFormType, createTicketSchema } from './schema';

const CreateTicketScreen = ({ route }: CreateTicketScreenNavigationProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_CREATE_TICKET_QUERY_KEY],
    queryFn: () => execute(GetCreateTicketQuery),
    select: (data) => data.data,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { images, selectImage, deleteImage, clearImages } = useUploadImage();
  const form = useForm<CreateTicketFormType>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      categoryId: 0,
      title: '',
      description: '',
      images,
    },
  });
  const imagesWatch = form.watch('images');
  const formattedOrderProduct = useMemo(
    () =>
      data?.userLabs.map((item) => ({
        ...item,
        value: item.orderItem.id,
        label: `#${btoa(btoa(btoa(btoa(item.orderItem.id))))} - ${item.orderItem.product.name}`,
      })),
    [data?.userLabs],
  );

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  console.log(error);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ScrollView
        contentContainerClassName='flex-grow gap-[16px] p-[25px] py-[30px] mx-auto w-full max-w-xl bg-muted'
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        <View className='gap-[16px]'>
          <View className='gap-[6px]'>
            <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
              Ticket type
              <Text className='font-inter-medium text-[#DC2626] text-[14px] leading-[20px]'> *</Text>
            </Text>
            <SelectCountry
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              activeColor='#16a34a1a'
              showsVerticalScrollIndicator={false}
              maxHeight={200}
              renderRightIcon={() => <ChevronsUpDown size={20} className='text-muted-foreground' />}
              data={data?.ticketCategorys || []}
              valueField='id'
              labelField='name'
              imageField='image'
              placeholder='Select category'
              onChange={(e) => form.setValue('categoryId', +e.id)}
            />
          </View>

          <View className='gap-[6px]'>
            <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
              Order Product ID
              <Text className='font-inter-medium text-[#DC2626] text-[14px] leading-[20px]'> *</Text>
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              inputSearchStyle={styles.inputSearchStyle}
              activeColor='#16a34a1a'
              showsVerticalScrollIndicator={false}
              maxHeight={300}
              renderRightIcon={() => <ChevronsUpDown size={20} className='text-muted-foreground' />}
              data={formattedOrderProduct || []}
              search
              labelField='label'
              valueField='value'
              placeholder={'Select Product'}
              searchPlaceholder='Search Order Product ID or Product Name'
              onChange={(item) => {}}
              renderItem={({ label, value, orderItem }) => (
                <View className='flex-row items-center gap-[16px] px-[8px] py-[12px] rounded-[6px]'>
                  <Image
                    source={''}
                    placeholder={{ blurhash: constants.EXPO_IMAGE.BLUR_HASH }}
                    style={{ width: 80, height: 80, alignSelf: 'center', borderRadius: 4 }}
                    contentFit='cover'
                  />

                  <View className='flex-1 items-start gap-[4px]'>
                    <Text numberOfLines={1} className='font-inter-bold text-foreground text-[12px]'>
                      Amazing T-shirt
                    </Text>
                    <Text className='font-inter-regular text-foreground text-[12px]'>Ticket: 1/3</Text>
                    <Text className='font-inter-regular text-foreground text-[12px]'>26-09-2024</Text>
                    <Text className='font-inter-regular text-muted-foreground text-[12px]'>
                      ID: {btoa(btoa(btoa(btoa(orderItem.id))))}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <PreviewImage image={selectedImage} visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E4E4E7',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  placeholderStyle: {
    fontFamily: 'Inter_18pt-Regular',
    color: '#71717A',
    fontSize: 14,
    lineHeight: 20,
  },
  selectedTextStyle: {
    fontFamily: 'Inter_18pt-Regular',
    color: '#1A1A1A',
    fontSize: 14,
    lineHeight: 20,
  },
  containerStyle: {
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E4E4E7',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
    overflow: 'hidden',
  },
  inputSearchStyle: {
    fontFamily: 'Inter_18pt-Regular',
    color: '#1A1A1A',
    fontSize: 14,
    lineHeight: 20,
  },
});
export default CreateTicketScreen;
