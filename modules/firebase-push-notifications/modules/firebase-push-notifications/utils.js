import { Platform } from "react-native";
import { getUniqueId, getAndroidId, getModel } from "react-native-device-info";
import { registerDeviceInfoAPI } from "./api";
import messaging from "@react-native-firebase/messaging";

const RemotePushController = async (authToken, userID) => {
  // This variable requests permission
  const authStatus = await messaging().requestPermission();
  // This variable checks wether a permission is given or not.
  const enabled =
  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // FCM token
    const registrationToken = await messaging().getToken();
    const androidId = await getAndroidId();
    const iosId = await getUniqueId();
    // API to register device on your backend
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
