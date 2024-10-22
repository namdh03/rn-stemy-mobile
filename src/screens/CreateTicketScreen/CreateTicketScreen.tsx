import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image as RNImage, ScrollView, StyleSheet, Text as RNText, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import Pressable from '~components/customs/Pressable';
import PreviewImage from '~components/customs/PreviewImage';
import { Form, FormField, FormInput, FormMessage, FormTextarea } from '~components/deprecated-ui/form';
import { ChevronsUpDown, CircleX, Download } from '~components/icons';
import { Button } from '~components/ui/button';
import { Text } from '~components/ui/text';
import constants from '~constants';
import execute from '~graphql/execute';
import { useCreateTicket, useUploadImage } from '~hooks';
import { GetCreateTicketQuery } from '~services/ticket.services';
import { CreateTicketScreenNavigationProps } from '~types/navigation.type';
import isErrors from '~utils/responseChecker';
import showDialogError from '~utils/showDialogError';

import OrderProductItem from './components/OrderProductItem';
import { CreateTicketFormType, createTicketSchema } from './schema';

const CreateTicketScreen: FC<CreateTicketScreenNavigationProps> = ({ route, navigation }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [constants.TICKET_QUERY_KEY.GET_CREATE_TICKET_QUERY_KEY],
    queryFn: () => execute(GetCreateTicketQuery),
    select: (data) => data.data,
  });
  const { mutate, isPending } = useCreateTicket();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { images, selectImage, deleteImage, clearImages } = useUploadImage();
  const form = useForm<CreateTicketFormType>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      orderItemId: +route.params.orderItemId,
      categoryId: 0,
      title: '',
      description: '',
      images,
    },
  });
  const imagesWatch = form.watch('images');
  const categoryIdWatch = form.watch('categoryId');
  const currentCategory = useMemo(
    () => data?.ticketCategorys.find((category) => +category.id === categoryIdWatch),
    [data?.ticketCategorys, categoryIdWatch],
  );

  const orderItemWatch = form.watch('orderItemId');
  const currentOrderItem = useMemo(
    () => data?.userLabs.find((lab) => +lab.orderItem.id === orderItemWatch),
    [data?.userLabs, orderItemWatch],
  );
  const formattedOrderProduct = useMemo(
    () =>
      data?.userLabs.map((item) => ({
        ...item,
        value: item.orderItem.id,
        label: `${btoa(btoa(btoa(btoa(item.orderItem.id))))} - ${item.orderItem.product.name}`,
      })),
    [data?.userLabs],
  );

  // Update form when images change
  useEffect(() => {
    form.setValue('images', images);

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();
        // Check if form has data before unmounting
        const hasUnsavedData = !!form.getValues('title') || !!form.getValues('description') || images.length > 0;

        // Prevent default back navigation if there is unsaved data
        if (hasUnsavedData) {
          e.preventDefault();

          // Show confirmation alert
          Alert.alert('Unsaved Changes', 'You have unsaved changes. Are you sure you want to leave?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => {
                // Remove listener and reset form if the user confirms
                form.reset();
                navigation.dispatch(e.data.action);
              },
            },
          ]);
        } else {
          // No unsaved data, reset form and proceed
          form.reset();
          navigation.dispatch(e.data.action);
        }
      }
    });

    return unsubscribe;
  }, [images, form]);

  const openImageModal = useCallback((imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  }, []);

  const handleOrderItemChange = useCallback(
    (item: { value: string }) => {
      form.setValue('orderItemId', +item.value);
    },
    [form],
  );

  const onSubmit = (values: CreateTicketFormType) => {
    mutate(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [constants.TICKET_QUERY_KEY.GET_CREATE_TICKET_QUERY_KEY],
        });
        queryClient.invalidateQueries({
          queryKey: [constants.PURCHASES_QUERY_KEY.GET_USER_LABS_IN_ORDER_QUERY_KEY],
        });
        form.reset();
        clearImages();
        navigation.replace('TicketDetailScreen', { index: 0, ticketId: data.data.createTicket.id });
      },
      onError: (errors) => {
        if (isErrors(errors)) {
          const error = errors.find((error) => error.path.includes('createTicket'));
          if (error?.message) {
            return showDialogError({ textBody: error.message });
          }
        }
        showDialogError();
      },
    });
  };

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
        <Form {...form}>
          <View className='gap-[16px]'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
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
                    value={currentCategory}
                    data={data?.ticketCategorys || []}
                    valueField='id'
                    labelField='name'
                    imageField='image'
                    placeholder='Select category'
                    onChange={({ id }) => {
                      field.onChange(id);
                      form.setValue('categoryId', +id);
                    }}
                  />
                  <FormMessage />
                </View>
              )}
            />

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
                maxHeight={400}
                renderRightIcon={() => <ChevronsUpDown size={20} className='text-muted-foreground' />}
                value={
                  currentOrderItem && {
                    ...currentOrderItem,
                    value: currentOrderItem.orderItem.id,
                    label: `${btoa(btoa(btoa(btoa(currentOrderItem.orderItem.id))))} - ${currentOrderItem.orderItem.product.name}`,
                  }
                }
                data={formattedOrderProduct || []}
                search
                labelField='label'
                valueField='value'
                placeholder={'Select Product'}
                searchPlaceholder='Search Order Product ID or Product Name'
                onChange={handleOrderItemChange}
                renderItem={({ orderItem }) => <OrderProductItem item={orderItem} />}
              />
            </View>

            {currentOrderItem && (
              <View className='bg-background rounded-[6px]'>
                <OrderProductItem item={currentOrderItem.orderItem} />
              </View>
            )}

            <View className='gap-[16px] w-full'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <View className='gap-[6px]'>
                    <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
                      Title
                      <Text className='font-inter-medium text-[#DC2626] text-[14px] leading-[20px]'> *</Text>
                    </Text>
                    <FormInput
                      placeholder='Ticket Title'
                      className='font-inter-regular max-h-[36px] text-foreground text-[14px] leading-[20px] rounded-[6px] shadow-sm placeholder:text-muted-foreground placeholder:text-[14px]'
                      autoCapitalize='words'
                      autoComplete='off'
                      {...field}
                    />
                  </View>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <View className='gap-[6px]'>
                    <Text className='font-inter-medium text-foreground text-[14px] leading-[20px]'>
                      Reason
                      <Text className='font-inter-medium text-[#DC2626] text-[14px] leading-[20px]'> *</Text>
                    </Text>
                    <FormTextarea
                      placeholder='Enter a description...'
                      className='font-inter-regular text-foreground text-[14px] leading-[20px] rounded-[6px] shadow-sm placeholder:text-muted-foreground placeholder:text-[14px]'
                      autoComplete='off'
                      {...field}
                    />
                  </View>
                )}
              />

              {imagesWatch.length < 5 && (
                <Pressable onPress={() => selectImage(true)}>
                  <View className='flex-row items-center gap-[16px]'>
                    <Text className='font-inter-medium text-foreground text-[14px]'>Upload Image</Text>
                    <Download className='text-foreground' size={24} strokeWidth={2.5} />
                  </View>
                </Pressable>
              )}

              <View className='flex-row items-center gap-[12px]'>
                {imagesWatch.map((image, index) => (
                  <View key={image.uri + index}>
                    <Pressable onPress={() => openImageModal(image.uri)}>
                      <RNImage
                        source={{ uri: image.uri }}
                        style={{ width: 50, height: 50, alignSelf: 'center', borderRadius: 4 }}
                        resizeMode='cover'
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => deleteImage(image)}
                      className='absolute top-[-6px] right-[-6px] p-1 bg-background rounded-full shadow z-10'
                    >
                      <CircleX className='text-destructive ' size={16} />
                    </Pressable>
                  </View>
                ))}
              </View>

              <Button size='lg' disabled={isPending} onPress={form.handleSubmit(onSubmit)}>
                {isPending ? (
                  <View className='flex-row items-center justify-center gap-[6px]'>
                    <ActivityIndicator className='text-secondary' />
                    <Text className='font-inter-semiBold text-secondary text-[16px]'>Loading...</Text>
                  </View>
                ) : (
                  <RNText className='font-inter-semiBold text-secondary text-[16px]'>Send</RNText>
                )}
              </Button>
            </View>
          </View>
        </Form>
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
    marginTop: 4,
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
