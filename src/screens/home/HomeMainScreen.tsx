import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { isEmpty } from '../../base/utils/baseUtil';
import { AlertModal } from '../../components/AlertModal';
import { Container } from '../../components/Container';
import { DataShower } from '../../components/DataShower';
import { LocationIcon } from '../../components/icons/LocationIcon';
import LinkingHelper from '../../helpers/LinkingHelper';
import PermissionsHelper from '../../helpers/PermissionsHelper';
import { Screens } from '../../navigation/consts/screens';
import { Colors } from '../../styles/Colors';
import { SearchField } from '../../widgets/SearchField';
import { ForecastInfo } from './components/ForecastInfo';

export const HomeMainScreen = observer(() => {
  const { forecastStore, geolocationStore, searchStore } = useRootStore();

  const insets = useSafeAreaInsets();

  const [isGeoAlertModalVisible, setIsGeoAlertModalVisible] = useState<boolean>(false);

  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.HOME_MAIN;
  });

  useEffect(() => {
    (async () => {
      const isLocationPermissionGranted = await PermissionsHelper.checkLocationPermission();

      await handleLocationForecast(isLocationPermissionGranted);
    })();

    return () => {
      forecastStore.setForecast(null);
      geolocationStore.setLocation(null);
      searchStore.setSearchQuery('');
    };
  }, []);

  const handleSearchByText = (query: string) => {
    if (!query) {
      forecastStore.setForecast(null);
      return;
    }

    forecastStore.getForecastByName(query);
  };

  const handleSearchLocation = async () => {
    Keyboard.dismiss();
    searchStore.setSearchQuery('');

    const isLocationPermissionGranted = await PermissionsHelper.checkLocationPermission();

    if (!isLocationPermissionGranted) {
      handleChangeGeoModalVisibility();
      return;
    }

    await handleLocationForecast(isLocationPermissionGranted);
  };

  const handleLocationForecast = async (isLocationPermissionGranted: boolean) => {
    if (!isLocationPermissionGranted) {
      return;
    }

    await geolocationStore.getUserLocation();

    if (!isEmpty(geolocationStore.location?.lat) && !isEmpty(geolocationStore.location?.lon)) {
      await forecastStore.getForecastByCoords(geolocationStore.location?.lat!, geolocationStore.location?.lon!);
    }
  };

  const handleChangeGeoModalVisibility = () => {
    setIsGeoAlertModalVisible(!isGeoAlertModalVisible);
  };

  return (
    <Container containerStyle={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.searchContainer}>
        <SearchField placeholder={'Enter city name'} debounceAction={handleSearchByText} style={styles.searchField} />
        <TouchableOpacity onPress={handleSearchLocation} style={styles.searchLocation}>
          <LocationIcon color={Colors.white} />
        </TouchableOpacity>
      </View>

      <DataShower loading={forecastStore.forecastLoader}>
        {forecastStore.forecast && <ForecastInfo forecast={forecastStore.forecast} />}
      </DataShower>

      <AlertModal
        isVisible={isGeoAlertModalVisible}
        title={'You need to provide access to the location'}
        leftButtonTitle={'Cancel'}
        rightButtonTitle={'Settings'}
        leftButtonAction={handleChangeGeoModalVisibility}
        rightButtonAction={LinkingHelper.openSettings}
      />
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchField: {
    flex: 1,
    marginRight: 10,
  },
  searchLocation: {
    width: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
