import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import { getUniqueId, getAndroidId, getModel } from "react-native-device-info";
import PushNotification from "react-native-push-notification";
import { registerDeviceInfoAPI } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";

const RemotePushController = (senderID, authToken, userID, dispatch) => {
  if (Platform.OS === "android") {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (token) {
        const androidId = await getAndroidId();
        await dispatch(registerDeviceInfoAPI({
          data: {
            user: userID,
            authToken: authToken,
            registration_id: token.token,
            type: Platform.OS,
            name: getModel(),
            active: true,
            device_id: androidId,
            cloud_message_type: "FCM"
          },
          authToken
        }))
          .then(unwrapResult)
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("REMOTE NOTIFICATION ==>", notification);
      },
      senderID: senderID,
      popInitialNotification: true,
      requestPermissions: true
    });
  } else {
    PushNotificationIOS.requestPermissions();
    PushNotificationIOS.addEventListener("register", async (token) => {
      const iosId = await getUniqueId();
      await registerDeviceInfoAPI({
        user: userID,
        authToken: authToken,
        registration_id: token,
        type: Platform.OS,
        name: getModel(),
        active: true,
        device_id: iosId
      }, authToken);
    });
  }
};

export default RemotePushController;
