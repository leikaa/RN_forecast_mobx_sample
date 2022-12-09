import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Navigation from '../../base/Navigation';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { ChevronRightIcon } from '../../components/icons/ChevronRightIcon';
import { GlobeIcon } from '../../components/icons/GlobeIcon';
import { Ag, Text } from '../../components/ui/Text';
import { Screens } from '../../navigation/consts/screens';
import { Colors } from '../../styles/Colors';

export const SettingsMainScreen = () => {
  const { t } = useTranslation();

  const renderSettingsItem = (text: string, icon: JSX.Element, onPress: () => void) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <View style={styles.itemIcon}>{icon}</View>
          <Text style={styles.itemText} ag={Ag.Regular} color={Colors.grey2}>
            {text}
          </Text>
        </View>
        <View style={styles.chevronContainer}>
          <ChevronRightIcon />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title={t('settings:screens.main.title')} titleAg={Ag.H2} showBack />
      <Container>
        {renderSettingsItem(t('settings:screens.main.language'), <GlobeIcon />, () =>
          Navigation.navigate(Screens.SETTINGS_LANGUAGE),
        )}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 12,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flexShrink: 1,
  },
  chevronContainer: {
    width: 24,
    height: 24,
  },
});
