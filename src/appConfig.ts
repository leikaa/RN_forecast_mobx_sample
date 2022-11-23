import { getBuildNumber, getVersion, getUniqueId } from 'react-native-device-info';

export const appConfig = {
  defaultApiUrl: __DEV__ ? '' : '',
  deviceId: getUniqueId(),
  version: `${getVersion()} (${getBuildNumber()})`,
};
