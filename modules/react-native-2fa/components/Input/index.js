import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
      />
      {props.errorText ? <Text style={styles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    borderColor: "lightgray",
    color: "#000"

  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
export default Input;
