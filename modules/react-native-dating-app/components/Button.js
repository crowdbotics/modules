import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

// create button component
const Button = ({ onPress, title, btnStyle, txtStyle, btnContainerStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, btnContainerStyle]}>
      <View style={[styles.button, btnStyle]}>
        <Text style={[styles.buttonText, txtStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#000",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 20,
    }
});

export default Button;