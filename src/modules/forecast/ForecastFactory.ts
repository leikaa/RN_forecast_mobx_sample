import AbstractFactory from '../../base/AbstractFactory';
import { Clouds } from './models/Clouds';
import { Coordinates } from './models/Coordinates';
import { Country } from './models/Country';
import { Forecast } from './models/Forecast';
import { WeatherMain } from './models/WeatherMain';
import { Wind } from './models/Wind';

export default class ForecastFactory extends AbstractFactory {
  createForecast = (item: Forecast) => {
    const forecast = this.create<Forecast>(Forecast, item);

    forecast.clouds = this.create<Clouds>(Clouds, forecast.clouds);
    forecast.coord = this.create<Coordinates>(Coordinates, forecast.coord);
    forecast.main = this.create<WeatherMain>(WeatherMain, forecast.main);
    forecast.sys = this.create<Country>(Country, forecast.sys);
    forecast.wind = this.create<Wind>(Wind, forecast.wind);

    return forecast;
  };
}
