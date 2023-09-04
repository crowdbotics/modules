import React, { Fragment, useContext, useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import DropDownPicker from "react-native-dropdown-picker";
import { useIsFocused } from "@react-navigation/native";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { OptionsContext } from "@options";
import {
  checkAuthenticationStatus,
  disableAuthenticationStatus,
  enableAuthentication,
  getGoogleAuthenticatorQR,
  sendVerification
} from "../../store";

/**
 * Authentication Types Component.
 * @param {Object} navigation - React Navigation prop.
 * @returns {React.ReactNode} - The authentication types component.
 */
const AuthTypes = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const options = useContext(OptionsContext);
  const { styles } = options;

  const [isVerified, setIsVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("None");

  const isLoading = useSelector((state) => {
    const loadingStates = [
      state?.Authentication?.sendVerification?.api?.loading,
      state?.Authentication?.getGoogleAuthenticatorQR?.api?.loading,
      state?.Authentication?.enableAuthentication?.api?.loading,
      state?.Authentication?.checkAuthenticationStatus?.api?.loading,
      state?.Authentication?.disableAuthentication?.api?.loading
    ];
    return loadingStates.some((loading) => loading === "pending");
  });

  const items = [
    { label: "SMS", value: "phone_number" },
    { label: "Email", value: "email" },
    { label: "Google Authenticator", value: "google_authenticator" },
    { label: "None", value: "None" }
  ];

  useEffect(() => {
    if (isFocused) {
      // This action dispatches checkAuthenticationStatus Api.
      dispatch(checkAuthenticationStatus())
        .then(unwrapResult)
        .then((res) => {
          setValue(res?.method);
          setIsVerified(true);
        })
        .catch(() => setValue("None"));
    }
  }, [isFocused]);

  const onApiSuccess = (res, value, type) => {
    navigation.navigate("Verification", {
      method: value,
      link: res?.link,
      authenticationType: type ? "enable" : null
    });
  };

  const onValueChange = ({ value }) => {
    if (value === "None" && isVerified) {
      // This action dispatches disableAuthenticationStatus Api
      dispatch(disableAuthenticationStatus())
        .then(unwrapResult)
        .then((res) => {
          setIsVerified(false);
          Alert.alert("Success", "Two Factor Authentication is disabled");
        })
        .catch((err) => console.log("NOT WORKING", err));
    } else if (value !== "None") {
      // This action dispatches enableAuthentication Apis
      dispatch(enableAuthentication({ method: value }))
        .then(unwrapResult)
        .then((res) => {
          onApiSuccess(res, value, true);
        })
        .catch((err) => console.log("NOT WORKING", err));
    }
  };

  const onHandleMethod = async (method) => {
    if (method === "google_authenticator") {
      // This action dispatches api to get google authenticator qr code link.
      dispatch(getGoogleAuthenticatorQR())
        .then(unwrapResult)
        .then((res) => {
          onApiSuccess(res, method, false);
        })
        .catch((err) => console.log("NOT WORKING", err));
    } else {
      // This action dispatches api to get code. It takes verification method as params
      dispatch(sendVerification({ method }))
        .then(unwrapResult)
        .then((res) => {
          onApiSuccess(res, method, false);
        })
        .catch((err) => console.log("NOT WORKING", err));
    }
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <Text style={styles.verificationText}>Verification methods</Text>
        <Text style={styles.text13}>
          Please select an option for verification from the following:
        </Text>

        <View style={styles.dropdownContainer} zIndex={1}>
          {!isVerified && !isLoading && (
            <Text style={styles.authenticationText}>
              Two Factor Authentication is disabled, please enable it through
              one of the methods below
            </Text>
          )}
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onSelectItem={onValueChange}
          />
        </View>

        {isVerified && (
          <View style={[styles.wp90, styles.p5]}>
            <Button onPress={() => onHandleMethod(value)}>Send OTP</Button>
          </View>
        )}
      </View>
    </Fragment>
  );
};

export default AuthTypes;
