import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { OptionsContext } from "@options";

const Loader = () => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="#000" />
      </View>
    </View>
  );
};

export default Loader;
