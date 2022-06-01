import React from "react";
import { StyleSheet, View, Slider, Text } from "react-native";

const Edits = ({ name, minimum, maximum, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
    <Slider
      style={styles.slider}
      minimumValue={minimum}
      maximumValue={maximum}
      onValueChange={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingLeft: 20
  },
  text: { textAlign: "center" },
  slider: { width: 150 }
});

export default Edits;
