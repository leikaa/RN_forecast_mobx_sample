import { Linking } from 'react-native';

export default class LinkingHelper {
  static openSettings = () => {
    return Linking.openSettings();
  };
}
