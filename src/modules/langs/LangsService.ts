import { Localization } from './LangsAdapter';
import LangsHelper from './helpers/LangsHelper';
import LangsApiRepository from './repositories/LangsApiRepository';
import LangsLocalRepository from './repositories/LangsLocalRepository';
import { ILangs, LangsType } from './types/Langs';

export default class LangsService {
  langsApi: LangsApiRepository;
  langsLocal: LangsLocalRepository;

  constructor() {
    this.langsApi = new LangsApiRepository();
    this.langsLocal = new LangsLocalRepository();
  }

  changeLang = async (lang: LangsType) => {
    this.langsApi.setLanguage(lang);
    await this.langsLocal.set(lang);

    if (lang) {
      await Localization.changeLanguage(lang);
    }
  };

  getLang = async () => {
    return await this.langsLocal.get();
  };

  getAutoLang = (langs: ILangs[]): string | null => {
    const deviceLocale = LangsHelper.getDeviceShortLocale();
    const availableLang = langs.find(lang => lang.lang === deviceLocale);

    if (deviceLocale && availableLang) {
      return availableLang.lang;
    }

    return null;
  };
}
