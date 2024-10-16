import * as FileSystem from 'expo-file-system';

export const imgDir = FileSystem.documentDirectory + 'images/';

export const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};
