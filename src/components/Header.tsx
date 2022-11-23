import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Navigation from '../base/Navigation';
import { isTrue } from '../base/utils/baseUtil';
import { Colors } from '../styles/Colors';
import { BackIcon } from './icons/BackIcon';
import { Text, Ag, Align } from './ui/Text';

interface IHeaderProps {
  title?: string;
  titleAg?: Ag;
  titleAlign?: Align;
  showBack?: boolean;
  rightComponent?: JSX.Element;
}

export const Header = (props: IHeaderProps) => {
  const insets = useSafeAreaInsets();

  const handleBackNavigation = () => {
    Navigation.pop();
  };

  return (
    <View style={[styles.header, styles.itemPadding, { height: 44 + insets.top, paddingTop: insets.top }]}>
      {props.showBack && (
        <View style={styles.icon}>
          <TouchableOpacity onPress={handleBackNavigation}>
            <BackIcon />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.title, props.showBack && styles.itemPadding]}>
        {isTrue(props.title) && (
          <Text ag={props.titleAg || Ag.Regular} align={props.titleAlign || Align.Center}>
            {props.title}
          </Text>
        )}
      </View>

      {(props.showBack || props.rightComponent) && <View style={styles.icon}>{props.rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemPadding: {
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
  },
  title: {
    flex: 1,
  },
});
