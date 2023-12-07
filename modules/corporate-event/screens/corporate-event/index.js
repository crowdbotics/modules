import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
import { OptionsContext, GlobalOptionsContext } from "@options";

const FeatureName = () => {
  // More info on all the options is below in the API Reference... just some common use cases shown here

  return (
    <View>
      <Text>corporate-event</Text>
    </View>
  );
};

export default {
  title: "FeatureName",
  navigator: FeatureName
};
