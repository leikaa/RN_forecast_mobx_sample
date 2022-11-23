import Geolocation from 'react-native-geolocation-service';

import { Nullable } from '../../base/types/BaseTypes';
import GeolocationFactory from './GeolocationFactory';
import { Coordinates } from './models/Coordinates';

export default class GeolocationService {
  geolocationFactory: GeolocationFactory;

  constructor() {
    this.geolocationFactory = new GeolocationFactory();
  }

  getUserLocation = async (): Promise<Nullable<Coordinates>> => {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        info => {
          resolve({ lon: info.coords.longitude, lat: info.coords.latitude } as Coordinates);
        },
        () => {
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  };
}
