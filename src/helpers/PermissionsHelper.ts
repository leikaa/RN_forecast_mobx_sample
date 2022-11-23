import { Platform } from 'react-native';
import { check, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default class PermissionsHelper {
  static checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      let iosPermission = await PermissionsHelper.checkPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (!iosPermission) {
        iosPermission = await PermissionsHelper.checkPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
      }

      return iosPermission;
    }

    return await PermissionsHelper.checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  };

  private static checkPermission = async (permission: Permission) => {
    const locationPermission = await check(permission);
    let isAccessGranted = false;

    if (locationPermission === RESULTS.GRANTED) {
      isAccessGranted = true;
    } else if (locationPermission === RESULTS.DENIED) {
      const locationAdditionalPermission = await request(permission);

      locationAdditionalPermission === RESULTS.GRANTED ? (isAccessGranted = true) : (isAccessGranted = false);
    }

    return isAccessGranted;
  };
}
