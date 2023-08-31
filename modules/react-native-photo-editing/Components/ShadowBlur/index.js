import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import Slider from "@react-native-community/slider";

const ShadowBlurs = (props) => {
  const [isInitialize, setIsInitialize] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialize(true);
    }, 50);
  }, []);

  const onValueChange = (value) => {
    if (isInitialize) {
      props.onChange(props.name, value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <Slider
        style={styles.slider}
        minimumValue={props.minimum}
        maximumValue={props.maximum}
        value={props.value}
        maximumTrackTintColor="#E3E5E9"
        minimumTrackTintColor="#000000"
        thumbTintColor="#000000"
        onValueChange={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 15
  },
  text: {
    textTransform: "capitalize",
    fontSize: 14,
    color: "#77838F",
    width: "25%"
  },
  slider: { width: "75%" }
});

export default ShadowBlurs;
