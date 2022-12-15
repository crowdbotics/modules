import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
export const CropRatioIcon = ({ option, selectionColor, handlePress }) => {
  const handleClick = () => {
    handlePress(option);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View style={[styles.border, { borderColor: selectionColor === option.label ? "#12D790" : "#77838F", width: option.dimensions.width, height: option.dimensions.height }]}></View>
      <Text style={styles.textColor}>{option.label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  },
  border: {
    borderColor: "#77838F",
    borderWidth: 2,
    borderRadius: 4
  },
  textColor: {
    color: "#77838F"
  },
  selectionColor: {
    borderColor: "#12D790"
  }
});
