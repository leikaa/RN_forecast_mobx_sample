import { isEmpty } from '../../../base/utils/baseUtil';
import { Forecast } from '../models/Forecast';
import { WeatherShort } from '../models/WeatherShort';

export default class ForecastRenderHelper {
  static getWeatherIconUrl = (weather: WeatherShort) => {
    return `https://openweathermap.org/img/w/${weather.icon}.png`;
  };

  static prepareForecastLocationName = (forecast: Forecast) => {
    let name = '';

    if (forecast.name) {
      name += forecast.name;
    }

    if (forecast.name && forecast.sys?.country) {
      name += `, ${forecast.sys.country}`;
    }

    return name;
  };

  static prepareForecastDescription = (forecast: Forecast) => {
    let description = '';

    if (!isEmpty(forecast.main?.feels_like)) {
      description += `Feels like ${Math.round(forecast.main?.feels_like!)} \u00b0C`;
    }

    return description;
  };
}
