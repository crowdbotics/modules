import React, { useContext, useEffect } from "react";
import {
  Text,
  View
} from "react-native";
import { OptionsContext, GlobalOptionsContext } from "@options";

const BasiqModule = () => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = useContext(OptionsContext);
  const gOptions = useContext(GlobalOptionsContext);

  useEffect(() => {
    // Do something when the module is mounted
    console.log("gOptions", gOptions);
    console.log("options", options);
  }, []);

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
