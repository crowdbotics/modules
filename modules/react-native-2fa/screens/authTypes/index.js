import React, { Fragment, useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { sendVerification, getGoogleAuthenticatorQR } from "../../store";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { OptionsContext } from "@options";
import { unwrapResult } from "@reduxjs/toolkit";

const AuthTypes = props => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onHandleMethod = async method => {
    setIsLoading(true);
    let apiResult = null;
    if (method === "google_authenticator") {
      await dispatch(getGoogleAuthenticatorQR())
        .then(unwrapResult)
        .then(res => {
          apiResult = res;
          setIsLoading(false);
        })
        .catch((error) => {
          apiResult = error;
          setIsLoading(false);
        });
    } else {
      await dispatch(sendVerification({ method: method }))
        .then(unwrapResult)
        .then(res => {
          apiResult = res;
          setIsLoading(false);
        })
        .catch((error) => {
          apiResult = error;
          setIsLoading(false);
        });
    }
    setIsLoading(false);
    if (apiResult.ok) {
      props.navigation.navigate("Verification", {
        method: method,
        link: apiResult?.link
      });
    } else {
      setErrors(apiResult);
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
      <View style={styles.main}>
        {Object.keys(errors).map(key => (
          <Fragment key={key}>
            {errors.length
              ? (
                  errors[key].map((obj, index) => (
                <Text key={index} style={styles.error}>
                  {key}: {obj}
                </Text>
                  ))
                )
              : (
              <Text style={styles.error}>{errors[key]}</Text>
                )}
          </Fragment>
        ))}
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
