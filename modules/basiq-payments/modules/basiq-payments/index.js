import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";
import { OptionsContext, GlobalOptionsContext } from "@options";

const BasiqModule = () => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = useContext(OptionsContext);
  const gOptions = useContext(GlobalOptionsContext);

  const { styles } = options;

  return (
    <View style={styles.heading}>
      <Text>Basiq Payments</Text>
    </View>
  );
};

export default {
  title: "BasiqModule",
  navigator: BasiqModule
};
