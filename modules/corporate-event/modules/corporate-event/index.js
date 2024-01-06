import React, { useContext } from "react";
import {
  Text,
  View
} from "react-native";
import { OptionsContext } from "@options";

const FeatureName = () => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = useContext(OptionsContext);

  const { styles } = options;

  return (
    <View style={styles.heading}>
      <Text>corporate-event</Text>
    </View>
  );
};

export default {
  title: "FeatureName",
  navigator: FeatureName
};
