import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Loader } from './Loader';

interface IDataShowerProps {
  loading: boolean;
  children: ReactNode;
  loaderStyles?: StyleProp<ViewStyle>;
}

export const DataShower = (props: IDataShowerProps) => {
  if (props.loading) {
    return (
      <View style={[styles.loadingContainer, props.loaderStyles]}>
        <Loader />
      </View>
    );
  }

  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
