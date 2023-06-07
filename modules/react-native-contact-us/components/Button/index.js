import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} disabled={props.disabled} underlayColor='#DDDDDD'>
      <View style={[styles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49
      }]}>
        <Text style={[styles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default Button;
