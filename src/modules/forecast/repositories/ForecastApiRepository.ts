import { appConfig } from '../../../appConfig';
import AbstractApiRepository from '../../../base/api/AbstractApiRepository';

export default class ForecastApiRepository extends AbstractApiRepository {
  getForecastByCoords = (lat: number, lon: number) => {
    return this.apiClient.get({
      url: `/weather?appid=${appConfig.forecast.token}&units=${appConfig.forecast.units}&lang=${appConfig.forecast.lang}&lat=${lat}&lon=${lon}`,
    });
  };

  getForecastByName = (query: string) => {
    return this.apiClient.get({
      url: `/weather?appid=${appConfig.forecast.token}&units=${appConfig.forecast.units}&lang=${appConfig.forecast.lang}&q=${query}`,
    });
  };
}
