import React, { Fragment, useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
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

const AuthTypes = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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

  // This variables gets the loading status for sendVerification code api
  const loading = useSelector(
    (state) => state?.Authentication?.sendVerification?.api?.loading
  );
  // This variables gets the loading status for getGoogleAuthenticatorQR code api
  const googleAuthenticatorLoading = useSelector(
    (state) => state?.Authentication?.getGoogleAuthenticatorQR?.api?.loading
  );
  // This variables gets the loading status for enableAuthentication api
  const enableAuthenticationLoading = useSelector(
    (state) => state?.Authentication?.enableAuthentication?.api?.loading
  );

  // This variables gets the loading status for enableAuthentication api
  const checkAuthenticationLoading = useSelector(
    (state) => state?.Authentication?.checkAuthenticationStatus?.api?.loading
  );

  // This variables gets the loading status for disableAuthentication api
  const disableAuthenticationLoading = useSelector(
    (state) => state?.Authentication?.disableAuthentication?.api?.loading
  );

  const isLoading = !!(
    loading === "pending" ||
    googleAuthenticatorLoading === "pending" ||
    enableAuthenticationLoading === "pending" ||
    checkAuthenticationLoading === "pending" ||
    disableAuthenticationLoading === "pending"
  );

  const options = useContext(OptionsContext);

  const [isVerified, setIsVerified] = useState(false);

  // States for dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("None");
  const [items, setItems] = useState([
    { label: "SMS", value: "phone_number" },
    { label: "Email", value: "email" },
    { label: "Google Authenticator", value: "google_authenticator" },
    { label: "None", value: "None" }
  ]);

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
      dispatch(sendVerification({ method: method }))
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
        <Text style={styles.text}>Verification methods</Text>
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
            setItems={setItems}
          />
        </View>

        {isVerified && (
          <View style={[options.styles.wp90, options.styles.p5]}>
            <Button onPress={() => onHandleMethod(value)}>Send OTP</Button>
          </View>
        )}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
    zIndex: 1
  },
  authenticationText: {
    marginBottom: 10,
    color: "#000"
  },
  dropdownContainer: {
    marginTop: 30,
    marginBottom: 40
  },
  switchText: {
    marginRight: 20
  },
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 18
  },
  text13: {
    fontSize: 13,
    marginBottom: 12
  }
});

export default AuthTypes;
