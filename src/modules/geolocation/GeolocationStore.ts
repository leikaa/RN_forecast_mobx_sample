import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import GeolocationService from './GeolocationService';
import { Coordinates } from './models/Coordinates';

export class GeolocationStore {
  location: Nullable<Coordinates> = null;

  private geolocationService: GeolocationService;

  constructor() {
    makeAutoObservable(this);
    this.geolocationService = new GeolocationService();
  }

  getUserLocation = async () => {
    return await this.geolocationService
      .getUserLocation()
      .then(response => {
        this.setLocation(response);
      })
      .catch(() => {});
  };

  setLocation = (value: Nullable<Coordinates>) => {
    this.location = value;
  };
}
