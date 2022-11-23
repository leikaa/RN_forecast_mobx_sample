import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IContainerProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Container = (props: IContainerProps) => {
  return <View style={[styles.container, props.containerStyle]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
