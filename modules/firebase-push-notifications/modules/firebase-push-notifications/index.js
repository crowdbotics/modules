import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import RemotePushController from "./utils";
import { OptionsContext } from "@options";
import Notifications from "./flatlist";
import { useDispatch } from "react-redux";
import { slice } from "./store";

const PushNotifications = () => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { senderID, authToken, userID, styles } = options;

  useEffect(() => {
    RemotePushController(senderID, authToken, userID, dispatch);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Notifications />
    </SafeAreaView>
  );
};

export default {
  title: "Push Notifications",
  navigator: PushNotifications,
  slice
};
