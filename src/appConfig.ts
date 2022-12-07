import { getBuildNumber, getVersion, getUniqueId } from 'react-native-device-info';

export const appConfig = {
  defaultApiUrl: __DEV__ ? 'https://api.openweathermap.org/data/2.5' : 'https://api.openweathermap.org/data/2.5',
  deviceId: getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,

  forecast: {
    token: 'e36dbb64b85904ada69b3f59b09fdbc8',
    units: 'metric',
    lang: 'en',
  },

  searchDelay: 500,

  voiceRecognition: {
    stopAfterSpeechTimer: 2,
    stopAfterIDLETimer: 5,
  },
};
