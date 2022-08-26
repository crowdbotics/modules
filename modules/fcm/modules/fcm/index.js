import React, { useEffect, useContext } from "react";
import {
  Text, TouchableOpacity, View
} from "react-native";
import RemotePushController from "./utils";
import { OptionsContext } from "@options";

const PushNotifications = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { senderID, authToken, styles } = options;

  useEffect(() => {
    RemotePushController(senderID, authToken);
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View style={styles.heading}>
        <TouchableOpacity
          style={styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <Text style={styles.header}>Push Notifications</Text>
      </View>
    </View>
  );
};

export default {
  title: "Push Notifications",
  navigator: PushNotifications
};
