import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Loader } from './Loader';
import { Button, ButtonType } from './ui/Button';
import { Text, Ag } from './ui/Text';

interface IDataShowerProps {
  isSuccess: boolean;
  isLoading: boolean;
  updateAction?: () => void;
  children?: ReactNode;
}

export const DataShower = (props: IDataShowerProps) => {
  if (props.isLoading) {
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );
  }

  if (!props.isSuccess) {
    return (
      <View style={styles.container}>
        <Text ag={Ag.Regular}>Something went wrong</Text>
        {props.updateAction && (
          <Button title={'Refresh'} onPress={props.updateAction} type={ButtonType.Flat} style={styles.refreshButton} />
        )}
      </View>
    );
  }

  return <View style={styles.contentWrapper}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  refreshButton: {
    marginTop: 8,
  },
});
