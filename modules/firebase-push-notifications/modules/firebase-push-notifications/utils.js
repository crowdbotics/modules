import { Platform } from "react-native";
import { getUniqueId, getAndroidId, getModel } from "react-native-device-info";
import { registerDeviceInfoAPI } from "./api";
import messaging from "@react-native-firebase/messaging";

/**
 * Request and generate Firebase Messaging token and store it in the DB via REST API
 * @param  {String} authToken Backend API authentication token
 * @param  {String} userID User Backend identifier
 * @return {Promise}
 */
const RemotePushController = async (authToken, userID) => {
  const authStatus = await messaging().requestPermission();
  const ENABLED_STATUSES = [
    messaging.AuthorizationStatus.AUTHORIZED,
    messaging.AuthorizationStatus.PROVISIONAL
  ];
  const isEnabled = ENABLED_STATUSES.includes(authStatus);
  // Checks if required permissions are allowed or not

  if (isEnabled) {
    const registrationToken = await messaging().getToken();
    const androidId = await getAndroidId();
    const iosId = await getUniqueId();
    // API which registers the device details and FCM token in backend
    await registerDeviceInfoAPI(
      {
        user: userID,
        authToken: authToken,
        registration_id: registrationToken,
        type: Platform.OS,
        name: getModel(),
        active: true,
        device_id: Platform.OS === "android" ? androidId : iosId,
        cloud_message_type: "FCM"
      },
      authToken
    );
  }
};

export default RemotePushController;
