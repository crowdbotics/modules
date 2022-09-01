import React, { useEffect, useState, useContext } from "react";
import FingerprintScanner from "react-native-fingerprint-scanner";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { OptionsContext } from "@options";
const FingerprintPopup = ({ style, handleDismissed, onAuthentication, onAuthenticationError }) => {
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(null);
  const [authState, setAuthState] = useState(true);

  const options = useContext(OptionsContext);
  const { popupStyles, descriptionStyle } = options;

  const authCurrent = () => {
    FingerprintScanner
      .authenticate({ title: "Log in with Biometrics" })
      .then((res) => {
        setMessage("Successfully Authenticated");
        onAuthentication();
        setError(false);
        FingerprintScanner.release();
      }).catch((err) => {
        const arr = err.toString().split(":");
        setMessage(arr[1]);
        setError(true);
        onAuthenticationError();
        FingerprintScanner.release();
      });
  };

  useEffect(() => {
    if (authState) {
      authCurrent();
    }
  }, [authState]);

  const dismissed = () => {
    if (handleDismissed) {
      handleDismissed();
      setError(true);
      setMessage("Authentication Canceled");
    }
    FingerprintScanner.release();
    setAuthState(false);
  };

  return (
        <View style={popupStyles.container}>
            <View style={[popupStyles.contentContainer, style]}>

                <Image
                    style={popupStyles.logo}
                    source={require("./assets/finger_print.png")}
                />

                <Text style={popupStyles.heading}>
                    Biometric{"\n"}Authentication
                </Text>
                <Text
                    style={descriptionStyle(error)}>
                    {message || "Scan your fingerprint on the\ndevice scanner to continue"}
                </Text>

                {
                    authState
                      ? <TouchableOpacity
                            style={popupStyles.buttonContainer}
                            onPress={() => dismissed()}
                        >
                            <Text style={popupStyles.buttonText}>
                                Dismiss
                            </Text>
                        </TouchableOpacity>
                      : <TouchableOpacity
                            style={popupStyles.buttonContainer}
                            onPress={() => setAuthState(true)}
                        >
                            <Text style={popupStyles.buttonText}>
                                Start
                            </Text>
                        </TouchableOpacity>
                }

            </View>
        </View>

  );
};

export default FingerprintPopup;
