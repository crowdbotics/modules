import React, { useEffect, useState, useContext } from "react";
import { slice } from "./store";
import { authorize } from "react-native-app-auth";
import { View, ActivityIndicator, Alert } from "react-native";
import { OptionsContext } from "@options";
import { useDispatch } from "react-redux";

const BlackbaudSky = ({
  navigation
}) => {
  const [browserRequesting, setBrowserRequesting] = useState(false);
  const options = useContext(OptionsContext);
  const {
    config
  } = options;
  const dispatch = useDispatch();
  useEffect(() => {
    setBrowserRequesting(true);

    try {
      authorize(config).then(response => {
        dispatch(slice.actions.saveAccessToken(response?.accessToken));
        setBrowserRequesting(false);
        navigation.navigate("EventListing");
      }).catch(err => {
        navigation.navigate("Login");
        Alert.alert("Error", err.message);
        setBrowserRequesting(false);
      });
    } catch (error) {
      navigation.navigate("Login");
      Alert.alert("Error", error.message);
      setBrowserRequesting(false);
    }
  }, []);
  return <View>
      {browserRequesting && <ActivityIndicator size={"large"} color={"#000"} />}
    </View>;
};

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky,
  slice
};
