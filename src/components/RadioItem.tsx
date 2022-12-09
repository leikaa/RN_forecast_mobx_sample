import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Colors } from '../styles/Colors';
import { Ag, Text } from './ui/Text';

interface IRadioItemProps<T> {
  value: T;
  title: string;
  isChecked: boolean;
  onPress: (value: T) => void;
  containerStyles?: StyleProp<ViewStyle>;
}

export const RadioItem = <T extends {}>(props: IRadioItemProps<T>) => {
  const renderRadio = () => {
    return <View style={[styles.radio, styles.unChecked, props.isChecked && styles.checked]} />;
  };

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.value)}
      activeOpacity={0.7}
      style={[styles.container, props.containerStyles]}
    >
      <Text ag={Ag.Regular} color={Colors.grey2} style={styles.title}>
        {props.title}
      </Text>
      {renderRadio()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  title: {
    flexShrink: 1,
    marginRight: 8,
  },
  checked: {
    borderWidth: 7,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  unChecked: {
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
});
