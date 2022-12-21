
import React, { Fragment, useContext, useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, Button } from "react-native";
import Navigator from "./Navigator";
// @ts-ignore
import { OptionsContext } from "@options";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Appointment = () => {
  const options = useContext(OptionsContext);
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  const [isToken, setIsToken] = useState(false);

  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (options.webClientId && options.androidClientId && options.iosClientId) {
      try {
        GoogleSignin.configure({
          scopes: ["https://www.googleapis.com/auth/calendar"],
          androidClientId: options.androidClientId,
          iosClientId: options.iosClientId,
          offlineAccess: true,
          webClientId: options.webClientId
        });
        GoogleSignin.getTokens().then(() => {
          setIsToken(true);
        }).catch(() => {
          setIsToken(false);
        });
      } catch (error) {
        setErrors(error.message);
      }
    } else {
      setErrors("webClientId, androidClientId and iosClientId keys are missing.");
    }
  }, []);

  const googleSignin = () => {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        if (options.webClientId && options.androidClientId && options.iosClientId) {
          GoogleSignin.signIn().then(() => {
            setIsToken(true);
          }).catch((e) => {
            setIsToken(false);
            setErrors(e.message);
          });
        } else {
          setErrors("webClientId, androidClientId and iosClientId keys are missing.");
        }
      }
    }).catch((e) => {
      setIsToken(true);
      setErrors(e.message);
    });
  };
  return (
    <Fragment>
      { isToken ? <Navigator /> : <Button disabled={!!errors} title="Signin with google" onPress={googleSignin} />}
      { errors && <Text style={styles.error}>{errors}</Text> }
    </Fragment>
  );
};
const styles = StyleSheet.create({
  error: {
    display: "flex",
    padding: 20,
    color: "red"
  }
});

export default {
  title: "Appointment",
  navigator: Appointment
};
