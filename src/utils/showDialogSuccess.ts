import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import constants from '~constants';

const showDialogSuccess = (params?: { title?: string; textBody?: string; button?: string }) => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: params?.title ?? constants.MESSAGES.SYSTEM_MESSAGES.SUCCESS_TITLE,
    textBody: params?.textBody ?? '',
    button: params?.button ?? 'Close',
  });
};

export default showDialogSuccess;
