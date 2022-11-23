import AbstractModel from '../../../base/AbstractModel';
import { Nullable } from '../../../base/types/BaseTypes';
import { Clouds } from './Clouds';
import { Coordinates } from './Coordinates';
import { Country } from './Country';
import { WeatherMain } from './WeatherMain';
import { WeatherShort } from './WeatherShort';
import { Wind } from './Wind';

export class Forecast extends AbstractModel {
  base: Nullable<string> = null;
  clouds: Nullable<Clouds> = null;
  cod: Nullable<number> = null;
  coord: Nullable<Coordinates> = null;
  dt: Nullable<number> = null;
  id: Nullable<number> = null;
  main: Nullable<WeatherMain> = null;
  name: Nullable<string> = null;
  sys: Nullable<Country> = null;
  timezone: Nullable<number> = null;
  visibility: Nullable<number> = null;
  weather: WeatherShort[] = [];
  wind: Nullable<Wind> = null;

  constructor(props: any) {
    super();
    this.load(props);
  }
}
