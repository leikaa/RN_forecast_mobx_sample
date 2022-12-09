import { getBuildNumber, getVersion, getUniqueId } from 'react-native-device-info';

import { ILangs, LangsType } from './modules/langs/types/Langs';

export const appConfig = {
  defaultApiUrl: __DEV__ ? 'https://api.openweathermap.org/data/2.5' : 'https://api.openweathermap.org/data/2.5',

  deviceId: getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,

  // New languages must also be specified for date-fns - DateHelper.getDateFnsLocale()
  defaultLang: LangsType.EN,
  languages: [
    { title: 'English', lang: LangsType.EN },
    { title: 'Русский', lang: LangsType.RU },
  ] as ILangs[],

  forecast: {
    token: 'e36dbb64b85904ada69b3f59b09fdbc8',
    units: 'metric',
  },

  searchDelay: 500,

  voiceRecognition: {
    stopAfterSpeechTimer: 2,
    stopAfterIDLETimer: 5,
  },
};
