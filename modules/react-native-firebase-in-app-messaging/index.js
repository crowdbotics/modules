import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { OptionsContext } from "@options";
import inAppMessaging from "@react-native-firebase/in-app-messaging";

const App = () => {
  const [canReceiveMessage, setCanReceiveMessage] = useState(true);
  const { styles } = useContext(OptionsContext);

  /**
   * Toggles the ability to receive messages and updates the state.
   */
  const toggleReceivingMessages = async () => {
    try {
      // Call the inAppMessaging function to set message display suppression
      await inAppMessaging().setMessagesDisplaySuppressed(!canReceiveMessage);

      // Update the state to reflect the new message receiving status
      setCanReceiveMessage(!canReceiveMessage);
    } catch (error) {
      __DEV__ && console.error("Error toggling receiving messages:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        Firebase In-App Messaging for React Native
      </Text>
      <View style={styles.innerContainer}>
        <Text style={styles.simpleText}>
          User Can Receive Message : {canReceiveMessage ? "Yes" : "No"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={toggleReceivingMessages}
        >
          <Text style={styles.buttonTextStyle}>
            {canReceiveMessage
              ? "Disable Receiving Message"
              : "Enable Receiving Message"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default {
  title: "Firebase In-App Messaging",
  navigator: App
};
