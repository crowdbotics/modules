import React, { Fragment, useContext, useEffect, useState } from "react";
import { LogBox, StyleSheet, Text, Button } from "react-native";
import Navigator from "./Navigator"; // @ts-ignore
import { slice } from "./store";
import { OptionsContext } from "@options";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**
 * Component to handle appointment and Google Sign-In flow.
 * @returns {JSX.Element} - The rendered Appointment component.
 */
const Appointment = () => {
  const { SCOPES_STRING, WEB_CLIENT_ID, IOS_CLIENT_ID, ANDROID_CLIENT_ID } =
    useContext(OptionsContext);
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  const [isToken, setIsToken] = useState(false);
  const [errors, setErrors] = useState(null);
  const scopes = SCOPES_STRING.split(",");

  /**
   * Effect to configure Google Sign-In and check for existing tokens.
   */
  useEffect(async () => {
    if (WEB_CLIENT_ID && ANDROID_CLIENT_ID && IOS_CLIENT_ID) {
      try {
        GoogleSignin?.addScopes({
          scopes: scopes
        });
        GoogleSignin?.configure({
          scopes: scopes,
          androidClientId: ANDROID_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID,
          offlineAccess: true,
          webClientId: WEB_CLIENT_ID
        });
        GoogleSignin?.getTokens()
          .then(async () => {
            setIsToken(true);
          })
          .catch(() => {
            setIsToken(false);
          });
      } catch (error) {
        setErrors(error.message);
      }
    } else {
      setErrors(
        "webClientId, androidClientId and iosClientId keys are missing."
      );
    }
  }, []);

  /**
   * Function to handle Google Sign-In.
   */
  const googleSignin = () => {
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          if (WEB_CLIENT_ID && ANDROID_CLIENT_ID && IOS_CLIENT_ID) {
            GoogleSignin.signIn()
              .then(() => {
                setIsToken(true);
              })
              .catch((e) => {
                setIsToken(false);
                setErrors(e.message);
              });
          } else {
            setErrors(
              "webClientId, androidClientId and iosClientId keys are missing."
            );
          }
        }
      })
      .catch((e) => {
        setIsToken(true);
        setErrors(e.message);
      });
  };

  return (
    <Fragment>
      {isToken
        ? (
        <Navigator />
          )
        : (
        <Button
          disabled={!!errors}
          title="Signin with google"
          onPress={googleSignin}
        />
          )}
      {errors && <Text style={styles.error}>{errors}</Text>}
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
  navigator: Appointment,
  slice
};
