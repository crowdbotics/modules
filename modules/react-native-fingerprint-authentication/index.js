import React, { useState, useEffect, useContext } from "react";
import {
  View
} from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner";

import { OptionsContext } from "@options";
import FingerprintPopup from "./popup";

const FingerprintAuthentication = ({ onAuthentication, onAuthenticationError, onDismissed }) => {
  const [popupShowed, SetPopupShowed] = useState(true);

  const options = useContext(OptionsContext);
  const { popupStyles } = options;

  const handleAuthentication = () => {
    if (onAuthentication) {
      onAuthentication();
      SetPopupShowed(false);
    };
  };

  const detectFingerprintAvailable = () => {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => console.log(error));
  };

  const handleAuthenticationError = () => {
    if (onAuthenticationError) {
      onAuthenticationError();
      SetPopupShowed(false);
    };
  };

  const handleDismissed = () => {
    if (onDismissed) {
      onDismissed();
      SetPopupShowed(false);
    };
  };

  useEffect(() => {
    detectFingerprintAvailable();
  }, []);

  return (
    <View style={popupStyles.mainContainer}>

      {popupShowed && (
        <FingerprintPopup
          style={popupStyles.popup}
          onAuthentication={handleAuthentication}
          onAuthenticationError={handleAuthenticationError}
          handleDismissed={handleDismissed}
        />
      )}

    </View>
  );
};

export default {
  title: "Fingerprint Authentication",
  navigator: FingerprintAuthentication
};
