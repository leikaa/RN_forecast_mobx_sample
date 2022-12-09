import React from 'react';

import { ForecastStore } from '../modules/forecast/ForecastStore';
import { GeolocationStore } from '../modules/geolocation/GeolocationStore';
import { LangsStore } from '../modules/langs/LangsStore';
import { SearchStore } from '../modules/search/SearchStore';
import { VoiceStore } from '../modules/voice/VoiceStore';

class RootStore {
  forecastStore: ForecastStore;
  geolocationStore: GeolocationStore;
  langsStore: LangsStore;
  searchStore: SearchStore;
  voiceStore: VoiceStore;

  constructor() {
    this.forecastStore = new ForecastStore();
    this.geolocationStore = new GeolocationStore();
    this.langsStore = new LangsStore();
    this.searchStore = new SearchStore();
    this.voiceStore = new VoiceStore();
  }

  sync = async () => {
    await Promise.all(
      Object.values(this).map(store => {
        return store?.sync ? store?.sync() : Promise.resolve();
      }),
    );
  };
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);
