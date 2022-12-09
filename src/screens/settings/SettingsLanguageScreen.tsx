import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

import { appConfig } from '../../appConfig';
import { useRootStore } from '../../base/hooks/useRootStore';
import { Header } from '../../components/Header';
import { RadioItem } from '../../components/RadioItem';
import { Ag } from '../../components/ui/Text';
import { ILangs } from '../../modules/langs/types/Langs';

export const SettingsLanguageScreen = observer(() => {
  const { langsStore } = useRootStore();

  const { t } = useTranslation();

  const handleSelectLanguage = async (item: ILangs) => {
    await langsStore.changeLang(item.lang);
  };

  return (
    <>
      <Header title={t('settings:screens.language.title')} titleAg={Ag.H2} showBack />
      <FlatList
        data={appConfig.languages}
        extraData={langsStore.lang}
        renderItem={({ item }) => (
          <RadioItem
            value={item}
            onPress={handleSelectLanguage}
            isChecked={langsStore.lang === item.lang}
            title={item.title}
            containerStyles={styles.itemContainer}
          />
        )}
        keyExtractor={(item: ILangs, index: number) => `lang_${index}_${item.lang}`}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 14,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
});
