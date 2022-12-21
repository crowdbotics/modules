import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

const Input = (props) => {
  return (
      <View>
        <TextInput
          style={textStyles.input}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={(num) => props.setValue(num)}
          placeholderTextColor='#ddd'
          editable={props.editable !== false}
        />
        {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
      </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
export default Input;
