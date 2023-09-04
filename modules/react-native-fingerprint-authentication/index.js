import React, { useEffect } from "react";
import { View, Alert, Platform, AlertIOS } from "react-native";
import TouchID from "react-native-touch-id";

const FingerprintAuthentication = ({ onAuthentication, onAuthenticationError }) => {
  const authCurrent = () => {
    TouchID
      .authenticate()
      .then((res) => {
        if (onAuthentication) {
          onAuthentication();
        }
        if (Platform.OS === "android") {
          Alert.alert(
            "Authenticated Successfully!",
            "Fingerprints have been matched and verified successfully"
          );
        } else {
          AlertIOS.alert("Authenticated Successfully!",
            "Fingerprints have been matched and verified successfully");
        }
      }).catch((err) => {
        if (onAuthenticationError) {
          onAuthenticationError();
        }
        const string = err.toString();
        const arr = string.split(":");
        if (Platform.OS === "android") {
          Alert.alert(
            arr[0],
            arr[1]
          );
        } else {
          AlertIOS.alert(arr[0],
            arr[1]);
        }
      });
  };

  useEffect(() => {
    authCurrent();
  }, []);

  return <View></View>;
};

export default {
  title: "Fingerprint Authentication",
  navigator: FingerprintAuthentication
};
