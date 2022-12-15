import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ title, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
  );
};
export const InlineButton = ({ title, onPress }) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
        <Text style={styles.txtStyle}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  txtStyle: {
    fontSize: 16
  }
});
export default Button;
