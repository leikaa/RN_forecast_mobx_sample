import { ApiClientTypes } from './ApiClientTypes';
import { IApiClient } from './IApiClient';
import AxiosClient from './axios/AxiosClient';

export default abstract class AbstractApiRepository<T extends IApiClient = AxiosClient> {
  apiClient!: IApiClient;

  private static clients: { [key: number]: IApiClient } = {
    [ApiClientTypes.axios]: new AxiosClient(),
  };

  constructor(apiClientType = ApiClientTypes.axios) {
    this.setApiClient(AbstractApiRepository.clients[apiClientType]);
  }

  setApiClient = (apiClient: IApiClient) => {
    this.apiClient = apiClient;
  };
}
