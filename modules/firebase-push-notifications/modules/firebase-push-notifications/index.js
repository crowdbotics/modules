import React, { useEffect, useContext } from "react";
import {
  SafeAreaView
} from "react-native";
import RemotePushController from "./utils";
import { OptionsContext } from "@options";
import Notifications from "./flatlist";

const PushNotifications = () => {
  const options = useContext(OptionsContext);
  const { senderID, authToken, userID, styles } = options;

  useEffect(() => {
    RemotePushController(senderID, authToken, userID);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Notifications />
    </SafeAreaView>
  );
};

export default {
  title: "Push Notifications",
  navigator: PushNotifications
};
