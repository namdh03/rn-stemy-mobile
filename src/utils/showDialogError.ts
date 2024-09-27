import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

import constants from '~constants';

const showDialogError = (params?: { title?: string; textBody?: string; button?: string }) => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: params?.title ?? constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
    textBody: params?.textBody ?? constants.MESSAGES.SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
    button: params?.button ?? 'Close',
  });
};

export default showDialogError;
