import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import React from "react";

const Button = () => {
  return (

    <TouchableHighlight
      underlayColor="#DDDDDD"
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: "#000000",
            height: 49
          }
        ]}
      >
        <Text style={[styles.text, { color: "#ffffff" }]}>Apply</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
