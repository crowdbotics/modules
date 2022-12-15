import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.Mt10}>
      {props.label && <Text style={styles.FwBold}>{props.label}</Text>}
      <TextInput
        style={[styles.input, styles.color]}
        placeholder={props.label}
        editable={props.editable}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      { ("errorMessage" in props && props.errorMessage !== "") && <Text style={styles.inputError}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
    fontSize: 12
  },
  inputError: {
    marginLeft: 4,
    fontStyle: "italic",
    color: "#FA060D"
  },
  Mt10: {
    marginTop: 10
  },
  FwBold: {
    fontWeight: "bold"
  },
  color: {
    color: "#000000"
  }
});

export default Input;
