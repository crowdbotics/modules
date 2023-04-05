import React, { Fragment, useState, useContext } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { getCode, sendVerification } from "../../store";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { OptionsContext } from "@options";
import { unwrapResult } from "@reduxjs/toolkit";

const AuthTypes = props => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const [isLoading, setIsLoading] = useState(false);

  const onHandleMethod = async method => {
    setIsLoading(true);
    if (method === "google_authenticator") {
      await dispatch(getCode({ id: options.user.id }))
        .then(unwrapResult)
        .then(res => {
          setIsLoading(false);
          props.navigation.navigate("GoogleAuth", {
            link: res?.link
          });
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          setIsLoading(false);
        });
    } else if (method === "phone_number") {
      await dispatch(sendVerification({ phone_number: options.user.phone_number }))
        .then(unwrapResult)
        .then(res => {
          setIsLoading(false);
          props.navigation.navigate("Verification", {
            method: method
          });
        })
        .catch(error => {
          Alert.alert("Error", error.message);
          setIsLoading(false);
        });
    } else {
      await dispatch(sendVerification({ email: options.user.email }))
        .then(unwrapResult)
        .then(res => {
          setIsLoading(false);
          props.navigation.navigate("Verification", {
            method: method
          });
        })
        .catch(error => {
          Alert.alert("Error", error.message);
          setIsLoading(false);
        });
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
        <View style={options.styles.FlexRowSpaceBetween}>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={() => onHandleMethod("phone_number")}>SMS</Button>
          </View>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={() => onHandleMethod("email")}>Email</Button>
          </View>
        </View>
        <View style={[options.styles.wp100, options.styles.p5]}>
          <Button onPress={() => onHandleMethod("google_authenticator")}>
            Google Authenticator
          </Button>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10
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
  },
  error: {
    paddingLeft: 5,
    fontStyle: "italic",
    color: "red"
  }
});

export default AuthTypes;
