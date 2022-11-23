import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ag, Text } from '../../components/ui/Text';

export const HomeMainScreen = observer(() => {
  return (
    <View style={styles.container}>
      <Text ag={Ag.Regular}>Test</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
