import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

const Button = (props) => {
  const {
    onPress,
    disabled,
    children,
    clicked
  } = props;
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled} underlayColor='#DDDDDD'>
      <View style={!clicked ? styles.button : styles.clicked}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  clicked: {
    padding: 10,
    backgroundColor: "#2E5984",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  }
});
export default Button;
