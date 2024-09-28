import { ALERT_TYPE, Dialog, IConfigDialog } from 'react-native-alert-notification';

import constants from '~constants';

const showDialogSuccess = (params?: Omit<IConfigDialog, 'type'>) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: params?.title ?? constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
    textBody: params?.textBody ?? '',
    button: params?.button ?? 'Close',
    onPressButton: params?.onPressButton,
    onHide: params?.onHide,
  });
};

export default showDialogSuccess;
