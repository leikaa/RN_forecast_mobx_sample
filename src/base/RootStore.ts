import React from 'react';

import { ForecastStore } from '../modules/forecast/ForecastStore';
import { GeolocationStore } from '../modules/geolocation/GeolocationStore';

class RootStore {
  forecastStore: ForecastStore;
  geolocationStore: GeolocationStore;

  constructor() {
    this.forecastStore = new ForecastStore();
    this.geolocationStore = new GeolocationStore();
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
