import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, StyleSheet, View } from 'react-native';

interface FlexibleImageProps {
  source: { uri: string };
  style?: ImageStyle;
  fallbackSource?: { uri: string };
}

export default function FlexibleImage({ source, style, fallbackSource }: FlexibleImageProps) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    Image.getSize(
      source.uri,
      (width, height) => {
        setAspectRatio(width / height);
        setIsLoading(false);
      },
      () => {
        setHasError(true);
        setIsLoading(false);
      },
    );
  }, [source.uri]);

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  if (hasError && fallbackSource) {
    return <Image source={fallbackSource} style={[styles.image, style]} />;
  }

  return <Image source={source} style={[styles.image, { aspectRatio }, style]} onError={() => setHasError(true)} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
  },
});
