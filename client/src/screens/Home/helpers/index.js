import { Permissions, Location } from 'expo';

export const askForLocationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return (status === 'granted');
}

export const locationServicesEnabled = async () => {
  const { gpsAvailable, locationServicesEnabled } = await Location.getProviderStatusAsync({});
  return (gpsAvailable && locationServicesEnabled);
};