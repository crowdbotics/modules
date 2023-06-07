import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import { getAndroidId, getModel } from "react-native-device-info";
import PushNotification from "react-native-push-notification";
import { registerDeviceInfoAPI } from "./api";

const RemotePushController = (senderID, authToken) => {
  PushNotification.configure({
    onRegister: async function (token) {
      const androidId = await getAndroidId();

      await registerDeviceInfoAPI({
        registration_id: token.token,
        type: Platform.OS,
        name: getModel(),
        device_id: androidId
      }, authToken);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,

    requestPermissions: true,
    senderID: senderID
  });
};

export default RemotePushController;
