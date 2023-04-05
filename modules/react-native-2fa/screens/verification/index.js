import React, { Fragment, useState, useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { sendVerification, verifyCode } from "../../store";
import Loader from "../../components/Loader";
import { OptionsContext } from "@options";
import { useRoute } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Verification = (props) => {
  const options = useContext(OptionsContext);
  const dispatch = useDispatch();
  const route = useRoute();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    setIsLoading(true);
    if (route.params.method === "email") {
      await dispatch(verifyCode({ code: `+${code}`, email: options.user.email }))
        .then(unwrapResult)
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            props.navigation.navigate("Home");
          } else {
            setIsLoading(false);
            Alert.alert("Error", res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      await dispatch(verifyCode({ code: `+${code}`, phone_number: options.user.phone_number }))
        .then(unwrapResult)
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            props.navigation.navigate("Home");
          } else {
            setIsLoading(false);
            Alert.alert("Error", res.message);
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          setIsLoading(false);
        });
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    if (route.params.method === "phone_number") {
      await dispatch(sendVerification({ phone_number: options.user.phone_number }))
        .then(unwrapResult)
        .then(res => {
          setIsLoading(false);
          Alert.alert("Message", res.message);
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
          Alert.alert("Message", res.message);
        })
        .catch(error => {
          Alert.alert("Error", error.message);
          setIsLoading(false);
        });
    }
  };

  const handleQRCode = () => {
    props.navigation.navigate("GoogleAuth", {
      link: route.params.link
    });
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <View style={styles.main}>
        <View>
          {route.params.method === "google_authenticator"
            ? (
            <Text style={styles.text}>
              Enter your 6-digits code from Google Authenticator App
            </Text>
              )
            : (
            <Text style={styles.text}>
              Verification code has been sent to your{" "}
              {route.params.method === "phone_number"
                ? "Phone number"
                : "Email"}
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
          {route.params.method !== "google_authenticator" && (
            <View style={styles.resend}>
              <Text>Did not receive a code? </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.textPurple}>Resend</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {route.params.method === "google_authenticator" && (
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

const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold"
  },
  textPurple: {
    color: "#2E5984",
    fontWeight: "bold"
  },
  resend: {
    paddingTop: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  pt15: {
    paddingTop: 15
  },
  error: {
    paddingLeft: 5,
    fontStyle: "italic",
    color: "red"
  }
});
