import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { manifest } from "./manifest.js";
import { getPropertyMap } from "./utils.js";

const YourApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your brand new app!</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    fontSize: 20
  },
})

const YourAppModule = {
  name: "Your App",
  navigator: YourApp,
  slice: null,
}

const validate = mod => {
  return (
    mod.hasOwnProperty("name") &&
    mod.hasOwnProperty("navigator") &&
    mod.hasOwnProperty("slice")
  )
}

const getModules = () => {
  let modules = manifest.filter(validate);
  return modules.length ? modules : [YourAppModule];
}

export const slices = Object.entries(
  getPropertyMap(getModules(), "slice")
);
export const navigators = Object.entries(
  getPropertyMap(getModules(), "navigator")
);
export const initialRoute = getModules()[0].name;
export default getModules;
