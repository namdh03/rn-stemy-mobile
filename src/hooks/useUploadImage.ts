import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { ensureDirExists, imgDir } from '~utils/file';

interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

const useUploadImage = () => {
  const [images, setImages] = useState<ImageFile[]>([]);

  // Load images on startup
  useEffect(() => {
    loadImages();

    return () => {
      clearImages();
    };
  }, []);

  // Load images from file system
  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      const loadedImages = await Promise.all(
        files.map(async (f) => {
          const fileUri = imgDir + f;
          return {
            uri: fileUri,
            name: f,
            type: `image/${f.split('.').pop()}`,
          };
        }),
      );
      setImages(loadedImages);
    }
  };

  // Clear images when component unmounts
  const clearImages = async () => {
    const files = await FileSystem.readDirectoryAsync(imgDir);
    await Promise.all(files.map((file) => FileSystem.deleteAsync(imgDir + file)));
    setImages([]);
  };

  // Save image to file system
  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpeg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    const newImage: ImageFile = {
      uri: dest,
      name: filename,
      type: 'image/jpeg',
    };
    setImages([...images, newImage]);
  };

  // Delete image from file system
  const deleteImage = async (imageToDelete: ImageFile) => {
    await FileSystem.deleteAsync(imageToDelete.uri);
    setImages(images.filter((img) => img.uri !== imageToDelete.uri));
  };

  // Type guard to check if FileInfo has 'size' property
  const hasSize = (fileInfo: FileSystem.FileInfo): fileInfo is FileSystem.FileInfo & { size: number } => {
    return 'size' in fileInfo;
  };

  // Select image from library or camera
  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    // Check image size and save if not cancelled and size is within limit
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (hasSize(fileInfo) && fileInfo.size <= MAX_IMAGE_SIZE) {
        await saveImage(uri);
      } else {
        Alert.alert(
          'Image Upload Error',
          'It seems that the selected image is larger than the 1MB limit or we couldn’t determine its size. Please choose a smaller image and try again.',
          [{ text: 'OK' }],
        );
      }
    }
  };

  return {
    images,
    deleteImage,
    selectImage,
    clearImages,
  };
};

export default useUploadImage;
