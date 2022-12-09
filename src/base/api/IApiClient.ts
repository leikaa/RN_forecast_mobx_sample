import { LangsType } from '../../modules/langs/types/Langs';

export interface IApiClient {
  setAccessToken: (token: string) => void;
  setLanguage: (language: LangsType) => void;
  clearAccessToken: () => void;

  get: <T extends {}>(config: any) => any;
  post: <T extends {}>(config: any) => any;
  put: <T extends {}>(config: any) => any;
  delete: <T extends {}>(config: any) => any;
}
