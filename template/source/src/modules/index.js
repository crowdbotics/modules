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
  title: "Your App",
  navigator: YourApp
}

const sortNavigators = (a, b) => {
  if (a.hasOwnProperty("navigator") && b.hasOwnProperty("navigator")) {
    return 0;
  } else if (a.hasOwnProperty("navigator")) {
    return -1;
  } else {
    return 1;
  }
}

const sortMenu = (a, b) => {
  if (a.title == "App Menu") {
    return -1;
  } else {
    return 0;
  }
}

const validate = (mod, prop) => {
  return mod.hasOwnProperty(prop);
};

const getModules = () => {
  // normalize modules
  let modules = manifest.map(mod => {
    if (validate(mod, "title")) {
      return mod;
    } else {
      return {
        title: `${mod.name}`,
        navigator: mod
      }
    }
  });
  modules = modules.sort(sortNavigators);
  modules = modules.sort(sortMenu);
  if (!(modules.length && modules[0].hasOwnProperty("navigator"))) {
    modules.splice(0, 0, YourAppModule);
  }
  return modules;
}

export const slices = Object.entries(
  getPropertyMap(getModules(), "slice")
);
export const navigators = Object.entries(
  getPropertyMap(getModules(), "navigator")
);
export const initialRoute = getModules()[0].title;
export default getModules;
