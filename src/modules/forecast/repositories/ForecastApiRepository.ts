import { appConfig } from '../../../appConfig';
import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import { Localization } from '../../langs/LangsAdapter';

export default class ForecastApiRepository extends AbstractApiRepository {
  getForecastByCoords = (lat: number, lon: number) => {
    return this.apiClient.get({
      url: `/weather?appid=${appConfig.forecast.token}&units=${appConfig.forecast.units}&lang=${Localization.language}&lat=${lat}&lon=${lon}`,
    });
  };

  getForecastByName = (query: string) => {
    return this.apiClient.get({
      url: `/weather?appid=${appConfig.forecast.token}&units=${appConfig.forecast.units}&lang=${Localization.language}&q=${query}`,
    });
  };
}
