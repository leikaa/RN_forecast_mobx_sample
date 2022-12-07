import PermissionsHelper from '../../../helpers/PermissionsHelper';

export default class GeolocationRenderHelper {
  static shouldRequestGeolocation = async (changeGeoModalVisibility: () => void) => {
    const isLocationPermissionGranted = await PermissionsHelper.checkLocationPermission();

    if (!isLocationPermissionGranted) {
      changeGeoModalVisibility();
    }

    return isLocationPermissionGranted;
  };
}
