import React from 'react';

import { ForecastStore } from '../modules/forecast/ForecastStore';

class RootStore {
  forecastStore: ForecastStore;

  constructor() {
    this.forecastStore = new ForecastStore();
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
