import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { OptionsContext } from "@options";

// create button component
const Button = ({ onPress, title, btnStyle, txtStyle, btnContainerStyle }) => {
  // Consume module's own options in this component
  const options = useContext(OptionsContext);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, btnContainerStyle]}>
      <View style={[styles.button, {
        backgroundColor: options.colors.primary
      }, btnStyle]}>
        <Text style={[
          styles.buttonText,
          { color: options.colors.secondaryText },
          txtStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  }
});

export default Button;
