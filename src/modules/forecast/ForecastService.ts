import ForecastFactory from './ForecastFactory';
import ForecastApiRepository from './repositories/ForecastApiRepository';

export default class ForecastService {
  forecastApi: ForecastApiRepository;
  forecastFactory: ForecastFactory;

  constructor() {
    this.forecastApi = new ForecastApiRepository();
    this.forecastFactory = new ForecastFactory();
  }

  getForecastByCoords = async (lat: number, lon: number) => {
    const { data } = await this.forecastApi.getForecastByCoords(lat, lon);
    return this.forecastFactory.createForecast(data);
  };

  getForecastByName = async (query: string) => {
    const { data } = await this.forecastApi.getForecastByName(query);
    return this.forecastFactory.createForecast(data);
  };
}
