import React, { useEffect, useState, Fragment, useContext } from "react";
import Navigator from "./Navigator";
import { LogBox } from "react-native";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { OptionsContext } from "@options";

const Appointment = () => {
  const options = useContext(OptionsContext);
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
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
      googleSignin();
    });
  }, []);

  const googleSignin = () => {
    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(() => {
          setIsToken(true);
        }).catch((e) => {
          setIsToken(false);
          console.log("Error: ", e);
        });
      }
    }).catch((e) => {
      setIsToken(true);
      console.log("Error: ", e);
    });
  };

  return (
    <Fragment>
      { isToken && <Navigator />}
    </Fragment>
  );
};

export default {
  title: "Appointment",
  navigator: Appointment
};
