import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Keyboard, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { isEmpty } from '../../base/utils/baseUtil';
import { AlertModal } from '../../components/AlertModal';
import { DataShower } from '../../components/DataShower';
import { MicrophoneIcon } from '../../components/icons/MicrophoneIcon';
import DataFormatterHelper from '../../helpers/DataFormatterHelper';
import LinkingHelper from '../../helpers/LinkingHelper';
import PermissionsHelper from '../../helpers/PermissionsHelper';
import GeolocationRenderHelper from '../../modules/geolocation/helpers/GeolocationRenderHelper';
import { Screens } from '../../navigation/consts/screens';
import { Colors } from '../../styles/Colors';
import { SearchField } from '../../widgets/SearchField';
import { ForecastInfo } from './components/ForecastInfo';

//todo forecast - add locales to switch between
//todo forecast - date-time should be according to location time-zone
export const HomeMainScreen = observer(() => {
  const { forecastStore, geolocationStore, searchStore, voiceStore } = useRootStore();

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

  useEffect(() => {
    voiceStore.initVoiceRecognition();

    return () => {
      voiceStore.resetVoiceRecognition();
    };
  }, []);

  useEffect(() => {
    voiceStore.stopVoiceRecognition();
  }, [voiceStore.speechTimer, voiceStore.startTimer]);

  useEffect(() => {
    if (!voiceStore.isStarted && voiceStore.speechResults.length) {
      searchStore.setSearchQuery(DataFormatterHelper.ucFirst(voiceStore.speechResults[0].toLowerCase()));
      forecastStore.getForecastByName(searchStore.searchQuery);
    }
  }, [voiceStore.speechResults]);

  const handleSearchByText = (query: string) => {
    if (!query) {
      forecastStore.setForecast(null);
      return;
    }

    forecastStore.getForecastByName(query);
  };

  const handleRefresh = async () => {
    searchStore.setSearchQuery('');

    const isPermissionGranted = await GeolocationRenderHelper.shouldRequestGeolocation(handleChangeGeoModalVisibility);

    await handleLocationForecast(isPermissionGranted);
    Keyboard.dismiss();
  };

  const handleVoiceRecognition = () => {
    voiceStore.startVoiceRecognition(handleChangeGeoModalVisibility);
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
    <ScrollView
      contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 16 }]}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
    >
      <View style={styles.searchContainer}>
        <SearchField placeholder={'Enter city name'} debounceAction={handleSearchByText} style={styles.searchField} />
        <TouchableOpacity
          onPress={handleVoiceRecognition}
          style={[styles.iconButton, voiceStore.isStarted && styles.iconActive]}
        >
          <MicrophoneIcon color={Colors.white} />
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
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchField: {
    flex: 1,
    marginRight: 10,
  },
  iconButton: {
    width: 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  iconActive: {
    backgroundColor: Colors.green,
  },
});
