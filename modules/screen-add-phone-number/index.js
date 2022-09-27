import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput
} from "react-native";

const AddPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <ImageBackground
      source={require("./assets/foodWatermark.png")}
      resizeMode="center"
      style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          placeholderTextColor="#9B9B9B"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 40
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  }
});

export default AddPhoneNumber;
