import React from 'react';
import { Modal as RNModal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react-native';

import { Button } from '~components/ui/button';
import { useModalStore } from '~store';
import { ALERT_TYPE, AlertModalParams, ConfirmModalParams } from '~store/modal/modal.type';

const IconColor = {
  SUCCESS: '#00C853',
  DANGER: '#FF1744',
  WARNING: '#FFD600',
  INFO: '#2979FF',
};

const getIconByType = (type?: ALERT_TYPE) => {
  switch (type) {
    case ALERT_TYPE.SUCCESS:
      return CheckCircle2;
    case ALERT_TYPE.WARNING:
      return AlertCircle;
    case ALERT_TYPE.DANGER:
      return XCircle;
    case ALERT_TYPE.INFO:
    default:
      return Info;
  }
};

export const Modal: React.FC = () => {
  const { isVisible, content, hideModal } = useModalStore();

  return (
    <RNModal animationType='slide' transparent={true} visible={isVisible} onRequestClose={hideModal}>
      <View className='flex-1 justify-center items-center bg-gray-900/60'>
        <View className='w-4/5 bg-background rounded-lg p-5'>
          <View className='flex-row items-center justify-between mb-2'>
            <View className='flex-row items-center'>
              {content?.icon && (
                <content.icon size={20} color={content.type ? IconColor[content.type] : IconColor.INFO} />
              )}
              <Text className='font-inter-semiBold text-foreground text-lg font-semibold ml-2'>{content?.title}</Text>
            </View>
            <TouchableOpacity onPress={hideModal}>
              <X size={20} color={'#000'} />
            </TouchableOpacity>
          </View>
          {content?.children}
        </View>
      </View>
    </RNModal>
  );
};

export const showAlertModal = (params?: AlertModalParams) => {
  const { showModal, hideModal } = useModalStore.getState();

  const timeoutId = params?.autoClose ? setTimeout(hideModal, params.autoCloseTime ?? 3000) : undefined;

  showModal({
    type: params?.type ?? ALERT_TYPE.INFO,
    icon: getIconByType(params?.type),
    title: params?.title ?? 'Notification',
    children: (
      <Pressable
        onPress={() => {
          if (timeoutId) clearTimeout(timeoutId);
          params?.onButtonPress?.();
          hideModal();
        }}
      >
        <Text className='font-inter-regular text-sm text-muted-foreground mb-6'>{params?.message ?? ''}</Text>
      </Pressable>
    ),
  });
};

export const showConfirmModal = (params?: ConfirmModalParams) => {
  const { showModal, hideModal } = useModalStore.getState();

  showModal({
    type: params?.type ?? ALERT_TYPE.WARNING,
    icon: getIconByType(params?.type),
    title: params?.title ?? 'Confirm',
    children: (
      <View>
        <Text className='font-inter-regular text-sm text-muted-foreground mb-6'>{params?.message ?? ''}</Text>
        <View>
          <View className='flex-row justify-end gap-[16px]'>
            <Button
              variant={'secondary'}
              className='min-w-[80px]'
              onPress={() => {
                params?.onCancel?.();
                hideModal();
              }}
              size='sm'
            >
              <Text className='font-inter-semiBold text-foreground text-[12px]'>{params?.cancelText ?? 'Cancel'}</Text>
            </Button>
            <Button
              variant={'default'}
              className='min-w-[80px]'
              onPress={() => {
                params?.onConfirm?.();
                hideModal();
              }}
              size='sm'
            >
              <Text className='font-inter-semiBold text-white text-[12px]'>{params?.confirmText ?? 'Confirm'}</Text>
            </Button>
          </View>
        </View>
      </View>
    ),
  });
};

export default Modal;
