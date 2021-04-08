import OneSignal from 'react-native-onesignal';
import { Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { ONE_SIGNAL_APP_ID } from "@env";

const useOneSignal = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    async function getDeviceState() {
      const deviceState = await OneSignal.getDeviceState();
      setIsSubscribed(deviceState.isSubscribed);
    }
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(ONE_SIGNAL_APP_ID);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    if (Platform.OS === "ios") {
      OneSignal.promptForPushNotificationsWithUserResponse(response => {
        console.log("Prompt response:", response);
      });
    }
    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log(
        "OneSignal: notification will show in foreground:",
        notifReceivedEvent
      );
      let notif = notifReceivedEvent.getNotification();
      const button1 = {
        text: "Cancel",
        onPress: () => { notifReceivedEvent.complete(); },
        style: "cancel"
      };
      const button2 = {
        text: "Complete",
        onPress: () => {
          notifReceivedEvent.complete(notif);
        }
      };
      Alert.alert(
        "Complete notification?",
        "Test",
        [button1, button2],
        { cancelable: true }
      );
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
      console.log("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      console.log("OneSignal: email subscription changed: ", event);
    });
    OneSignal.addSubscriptionObserver(event => {
      console.log("OneSignal: subscription changed:", event);
      setIsSubscribed(event.to.isSubscribed);
    });
    OneSignal.addPermissionObserver(event => {
      console.log("OneSignal: permission changed:", event);
    });
    getDeviceState();
  });

  return isSubscribed;
}

export default {
  title: "Push Notifications",
  hook: useOneSignal
};
