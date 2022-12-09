import AbstractApiRepository from '../../../base/api/AbstractApiRepository';
import { LangsType } from '../types/Langs';

export default class LangsApiRepository extends AbstractApiRepository {
  setLanguage = (language: LangsType) => {
    this.apiClient.setLanguage(language);
  };
}
