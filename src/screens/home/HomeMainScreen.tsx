import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useRootStore } from '../../base/hooks/useRootStore';
import { Container } from '../../components/Container';
import { SearchField } from '../../components/SearchField';
import { ForecastInfo } from './components/ForecastInfo';

export const HomeMainScreen = observer(() => {
  const { forecastStore } = useRootStore();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    forecastStore.getForecastByCoords();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      forecastStore.setForecast(null);
      return;
    }

    forecastStore.getForecastByName(query);
  };

  return (
    <Container containerStyle={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <SearchField placeholder={'Enter city name'} debounceAction={handleSearch} style={styles.searchContainer} />
      {forecastStore.forecast && <ForecastInfo forecast={forecastStore.forecast} />}
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
});
