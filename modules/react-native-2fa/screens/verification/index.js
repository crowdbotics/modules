import React, { Fragment, useState, useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { OptionsContext } from "@options";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import {
  verifyCode,
  sendVerification,
  verifyEnableAuthenticationCode,
  enableAuthentication
} from "../../store";

/**
 * Verification Component.
 * @returns {React.ReactNode} - The verification component.
 */
const Verification = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const dispatch = useDispatch();
  const route = useRoute();
  const { method, link, authenticationType } = route.params;

  // This variables gets the loading status for sendVerification code api
  const loading = useSelector(
    (state) => state?.Authentication?.sendVerification?.api?.loading
  );
  // This variables gets the loading status for code verification code api
  const verifyCodeLoading = useSelector(
    (state) => state?.Authentication?.verifyCode?.api?.loading
  );

  // This variables gets the loading status for enableAuthentication api
  const enableAuthenticationLoading = useSelector(
    (state) => state?.Authentication?.enableAuthentication?.api?.loading
  );

  // This variables gets the loading status for verifyEnableAuthenticationCode api
  const verifyEnableAuthenticationCodeLoading = useSelector(
    (state) =>
      state?.Authentication?.verifyEnableAuthenticationCode?.api?.loading
  );

  const isLoading = !!(
    verifyCodeLoading === "pending" ||
    loading === "pending" ||
    enableAuthenticationLoading === "pending" ||
    verifyEnableAuthenticationCodeLoading === "pending"
  );

  const [code, setCode] = useState("");

  const handleVerification = async () => {
    if (authenticationType) {
      // This action dispatches api to get authentication enabling code. It takes verification method and code as params
      dispatch(verifyEnableAuthenticationCode({ method: method, code: code }))
        .then(unwrapResult)
        .then(() => {
          navigation.navigate("AuthTypes");
          Alert.alert("Success", "Two-factor authentication has been enabled");
        })
        .catch((err) => console.log("Error", err));
    } else {
      // This action dispatches api for code verification. It takes verification method and code as params
      dispatch(verifyCode({ method: method, code: code }))
        .then(unwrapResult)
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((err) => console.log("Error", err));
    }
  };

  const onApiSuccess = (res) => {
    navigation.navigate("Verification", {
      method: method,
      link: res?.link,
      authenticationType: authenticationType ? "enable" : null
    });
  };

  const handleResendCode = async () => {
    if (authenticationType) {
      // This action dispatches api to get the code again for authentication enabling. It takes verification method as params
      dispatch(enableAuthentication({ method: method }))
        .then(unwrapResult)
        .then((res) => {
          onApiSuccess(res);
          Alert.alert("OTP sent", "Please check your inbox!");
        })
        .catch((err) => console.log("Error", err));
    } else {
      // This action dispatches api to get code. It takes verification method as params
      dispatch(sendVerification({ method: method }))
        .then(unwrapResult)
        .then((res) => {
          onApiSuccess(res);
        })
        .catch((err) => console.log("Error", err));
    }
  };
  const handleQRCode = () => {
    navigation.navigate("GoogleAuth", {
      link: link
    });
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <View style={styles.mainVerificationView}>
        <View>
          {method === "google_authenticator"
            ? (
            <Text style={styles.text}>
              Enter your 6-digits code from Google Authenticator App{" "}
              {authenticationType && "to enable two factor authentication"}
            </Text>
              )
            : (
            <Text style={styles.text}>
              Verification code has been sent to your{" "}
              {method === "phone_number" ? "Phone number." : "Email."}
              {authenticationType &&
                " Please enter it to enable two factor authentication"}
            </Text>
              )}
          <Input
            label="Enter Code"
            returnKeyType="next"
            value={code}
            setValue={setCode}
            autoCapitalize="none"
            placeholder="Verification code"
          />
          <View>
            <Button mode="contained" onPress={handleVerification}>
              Verify
            </Button>
          </View>
          {method !== "google_authenticator" && (
            <View style={styles.resend}>
              <Text>Did not receive a code? </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.textPurple}>Resend</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {method === "google_authenticator" && (
          <View style={styles.pt15}>
            <Button mode="contained" onPress={handleQRCode}>
              Google Authenticator QR Code
            </Button>
          </View>
        )}
      </View>
    </Fragment>
  );
};

export default Verification;
