import { Image } from 'expo-image';
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';

type MemoizedImageProps = {
  uri: string;
  width: number;
  height: number;
  style?: StyleProp<ImageStyle>;
};

const MemoizedImage = React.memo(({ uri, width, height, style }: MemoizedImageProps) => {
  return (
    <Image
      source={{ uri }}
      style={[{ width, height, borderRadius: 10 }, style]}
    />
  );
}, areEqual);

MemoizedImage.displayName = '';

function areEqual(prevProps: MemoizedImageProps, nextProps: MemoizedImageProps) {
  return (
    prevProps.uri === nextProps.uri &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.style === nextProps.style
  );
}

export default MemoizedImage;
