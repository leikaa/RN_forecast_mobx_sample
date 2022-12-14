import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import ForecastService from './ForecastService';
import { Forecast } from './models/Forecast';

export class ForecastStore {
  forecastLoader: boolean = false;

  forecast: Nullable<Forecast> = null;

  private forecastService: ForecastService;

  constructor() {
    makeAutoObservable(this);
    this.forecastService = new ForecastService();
  }

  getForecastByCoords = (lat: number, lon: number) => {
    this.setForecastLoader(true);

    return this.forecastService
      .getForecastByCoords(lat, lon)
      .then(response => {
        this.setForecast(response);
      })
      .catch(() => {})
      .finally(() => this.setForecastLoader(false));
  };

  getForecastByName = (query: string) => {
    this.setForecastLoader(true);

    return this.forecastService
      .getForecastByName(query)
      .then(response => {
        this.setForecast(response);
      })
      .catch(() => {})
      .finally(() => this.setForecastLoader(false));
  };

  setForecast = (value: Nullable<Forecast>) => {
    this.forecast = value;
  };

  private setForecastLoader = (value: boolean) => {
    this.forecastLoader = value;
  };
}
