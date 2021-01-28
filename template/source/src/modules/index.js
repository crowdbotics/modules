import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { modules } from "./manifest.js";
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
  reducer: null,
  actions: null
}

const getModules = () => {
  return modules.length ? modules : [YourAppModule];
}

export const reducers = getPropertyMap(getModules(), "reducer");
export const actions = getPropertyMap(getModules(), "actions");
export const navigators = Object.entries(getPropertyMap(getModules(), "navigator"));
export const initialRoute = getModules()[0].name;

export default modules;
