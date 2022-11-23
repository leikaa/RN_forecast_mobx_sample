import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

import { Loader } from './Loader';

interface IImageWithLoaderProps extends FastImageProps {
  containerStyles?: StyleProp<ViewStyle>;
}

export const ImageWithLoader = (props: IImageWithLoaderProps) => {
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  const handleLoadingStart = () => {
    setIsLoadingContent(true);
  };

  const handleLoadingEnd = () => {
    setIsLoadingContent(false);
  };

  return (
    <View style={props.containerStyles}>
      <FastImage
        style={[styles.image, props.style]}
        onLoadStart={handleLoadingStart}
        onLoad={handleLoadingEnd}
        onError={handleLoadingEnd}
        {...props}
      />

      <View style={styles.loaderWrapper}>{isLoadingContent && <Loader size={'small'} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  loaderWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
});
