import { NativeModules, Platform } from 'react-native';

export default class LangsHelper {
  static getDeviceShortLocale = (): string | undefined => {
    const deviceLocale = this.getDeviceLocale();

    if (deviceLocale) {
      return deviceLocale.split(/[-_]/)[0];
    }
  };

  private static getDeviceLocale = (): string | undefined => {
    if (Platform.OS === 'ios') {
      return (
        NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      );
    }

    return NativeModules.I18nManager.localeIdentifier;
  };
}
