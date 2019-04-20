import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { dataApiPatch } from 'px/clients/data_api_client';
import LOCAL_STORAGE from 'px/constants/local-storage';

export async function requestPermissionForPushNotifications() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
}

// - we only store the device id once a user creates an account
//   but we ask for push notification permission on app start
// export async function storeDeviceId() {
//   const rawUser = await AsyncStorage.getItem(LOCAL_STORAGE.USER_INFO);
//   const user = JSON.parse(rawUser);
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;
//
//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }
//
//   // Get the token that uniquely identifies this device
//   let deviceId = await Notifications.getExpoPushTokenAsync();
//   // - no need to update deviceid if it's already the same
//   if (deviceId === user.deviceId) return;
//
//   // POST the token to your backend server from where you can retrieve it to send push notifications.
//   const res = await dataApiPatch('', { user: { deviceId } });
//   AsyncStorage.setItem(LOCAL_STORAGE.USER_INFO, JSON.stringify(res.user));
// }

export async function determinePushNotificationPermission() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  return existingStatus;
}

export async function getDeviceId() {
  return await Notifications.getExpoPushTokenAsync();
}
