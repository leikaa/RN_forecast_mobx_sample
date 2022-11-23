import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';

export class WeatherMain extends AbstractModel {
  feels_like: Nullable<number> = null;
  grnd_level: Nullable<number> = null;
  humidity: Nullable<number> = null;
  pressure: Nullable<number> = null;
  sea_level: Nullable<number> = null;
  temp: Nullable<number> = null;
  temp_max: Nullable<number> = null;
  temp_min: Nullable<number> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
