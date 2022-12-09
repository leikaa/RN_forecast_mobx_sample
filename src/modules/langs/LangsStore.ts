import { makeAutoObservable } from 'mobx';

import { appConfig } from '../../appConfig';
import LangsService from './LangsService';
import { LangsType, ILangs } from './types/Langs';

export class LangsStore {
  lang: LangsType = appConfig.defaultLang;
  langs: ILangs[] = appConfig.languages;

  private langsService: LangsService;

  constructor() {
    makeAutoObservable(this);
    this.langsService = new LangsService();
  }

  changeLang = async (lang: LangsType) => {
    this.setLang(lang);
    await this.langsService.changeLang(lang);
  };

  sync = async () => {
    let lang = await this.langsService.getLang();

    if (!lang) {
      lang = this.langsService.getAutoLang(this.langs);
    }

    await this.changeLang(lang ?? LangsType.EN);
  };

  private setLang = (lang: LangsType) => {
    this.lang = lang;
  };
}
