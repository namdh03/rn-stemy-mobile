import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={hideModal} />
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {content?.icon && (
              <content.icon size={20} color={content.type ? IconColor[content.type] : IconColor.INFO} />
            )}
            <Text style={styles.titleText}>{content?.title}</Text>
          </View>
          <TouchableOpacity onPress={hideModal}>
            <X size={20} color={'#000'} />
          </TouchableOpacity>
        </View>
        {content?.children}
      </View>
    </View>
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
        <Text style={styles.messageText}>{params?.message ?? ''}</Text>
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
        <Text style={styles.messageText}>{params?.message ?? ''}</Text>
        <View style={styles.buttonRow}>
          <Button
            variant={'secondary'}
            onPress={() => {
              params?.onCancel?.();
              hideModal();
            }}
            size='sm'
          >
            <Text style={styles.cancelText}>{params?.cancelText ?? 'Cancel'}</Text>
          </Button>
          <Button
            variant={'default'}
            onPress={() => {
              params?.onConfirm?.();
              hideModal();
            }}
            size='sm'
          >
            <Text style={styles.confirmText}>{params?.confirmText ?? 'Confirm'}</Text>
          </Button>
        </View>
      </View>
    ),
  });
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  messageText: {
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  cancelText: {
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#000000',
    fontSize: 12,
  },
  confirmText: {
    fontFamily: 'Inter_18pt-SemiBold',
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default Modal;
