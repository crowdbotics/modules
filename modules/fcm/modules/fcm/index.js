import React, { useEffect, useContext } from "react";
import {
  SafeAreaView
} from "react-native";
import RemotePushController from "./utils";
import { OptionsContext } from "@options";
import Notifications from "./flatlist";

const PushNotifications = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { senderID, authToken } = options;

  useEffect(() => {
    RemotePushController(senderID, authToken);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <Notifications />
    </SafeAreaView>
  );
};

export default {
  title: "Push Notifications",
  navigator: PushNotifications
};
