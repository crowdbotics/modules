import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { styles } from "./styles";

const PushNotifications = ({ navigation }) => {
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
