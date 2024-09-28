import { ALERT_TYPE, Dialog, IConfigDialog } from 'react-native-alert-notification';

import constants from '~constants';

const showDialogError = (params?: Omit<IConfigDialog, 'type'>) => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: params?.title ?? constants.MESSAGES.SYSTEM_MESSAGES.ERROR_TITLE,
    textBody: params?.textBody ?? constants.MESSAGES.SYSTEM_MESSAGES.SOMETHING_WENT_WRONG,
    button: params?.button ?? 'Close',
    onPressButton: params?.onPressButton,
    onHide: params?.onHide,
  });
};

export default showDialogError;
