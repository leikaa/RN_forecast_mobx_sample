import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { Colors } from '../styles/Colors';
import { Ag, Text } from './ui/Text';

interface IAlertModalProps {
  isVisible: boolean;
  title: string;
  leftButtonTitle: string;
  rightButtonTitle: string;
  leftButtonAction: () => void;
  rightButtonAction: () => void;
}

export const AlertModal = (props: IAlertModalProps) => {
  const renderButton = (buttonTitle: string, buttonAction: () => void, AgStyle: Ag) => {
    return (
      <TouchableOpacity style={styles.button} onPress={buttonAction}>
        <Text ag={AgStyle} color={Colors.primary} style={styles.buttonText}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={props.isVisible} backdropTransitionOutTiming={0}>
      <View style={styles.container}>
        <Text ag={Ag.Subtitle1} style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.buttonsContainer}>
          {renderButton(props.leftButtonTitle, props.leftButtonAction, Ag.Button)}
          <View style={styles.divider} />
          {renderButton(props.rightButtonTitle, props.rightButtonAction, Ag.Button)}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    maxWidth: 271,
    alignSelf: 'center',
    borderRadius: 14,
  },
  title: {
    textAlign: 'center',
    paddingVertical: 19,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.grey1,
  },
  button: {
    paddingVertical: 9,
    width: 135,
  },
  buttonText: {
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.grey1,
  },
});
