import React from "react";
import Navigator from "./Navigator";
import { LogBox } from "react-native";
import { slice } from "./store";

const Appointment = () => {
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  return (
    <Navigator />
  );
};

export default {
  title: "Appointment",
  navigator: Appointment,
  slice: slice
};
