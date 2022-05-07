import React, { useEffect } from "react";
import Navigator from "./Navigator";
import { LogBox } from "react-native";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import options from "./options";

const Appointment = () => {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/calendar"],
      androidClientId: options.androidClientId,
      offlineAccess: true,
      webClientId: options.webClientId
    });

    GoogleSignin.hasPlayServices().then((hasPlayService) => {
      if (hasPlayService) {
        GoogleSignin.signIn().then(() => {
        }).catch((e) => {
          console.log("ERROR IS: " + JSON.stringify(e));
        });
      }
    }).catch((e) => {
      console.log("ERROR IS: " + JSON.stringify(e));
    });
  }, []);

  return (
    <Navigator />
  );
};

export default {
  title: "Appointment",
  navigator: Appointment
};
