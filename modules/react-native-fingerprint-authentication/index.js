import React, { useEffect } from "react";
import { View, Alert, Platform, AlertIOS } from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner";

const FingerprintAuthentication = ({ onAuthentication, onAuthenticationError }) => {
  const authCurrent = () => {
    FingerprintScanner
      .authenticate({ title: "Log in with Biometrics" })
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
        FingerprintScanner.release();
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
        FingerprintScanner.release();
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
