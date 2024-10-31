import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react-native';

export enum ALERT_TYPE {
  SUCCESS = 'SUCCESS',
  DANGER = 'DANGER',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

export interface ModalContent {
  title?: string;
  icon?: LucideIcon;
  type?: ALERT_TYPE;
  children?: ReactNode;
}

export interface ModalState {
  isVisible: boolean;
  content: ModalContent | null;
}

export interface ModalSlice extends ModalState {
  showModal: (content: ModalContent) => void;
  hideModal: () => void;
}

export interface AlertModalParams {
  title?: string;
  message?: string;
  type?: ALERT_TYPE;
  buttonText?: string;
  onButtonPress?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export interface ConfirmModalParams {
  title?: string;
  message?: string;
  type?: ALERT_TYPE;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
