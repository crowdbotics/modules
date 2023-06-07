import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, TextInput } from "react-native";

const OrderCompleteScreen = (params) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername("User");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hi {username},</Text>
        <Text style={styles.subHeading}>Your order has been completed.</Text>
      </View>
      <Image
        source={require("./assets/orderCompleted.png")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Verification Message</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={""}
          placeholder="Click to see"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Image
          source={require("./assets/dropdownIcon.png")}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold"
  },
  subHeading: {
    fontSize: 16
  },
  image: {
    alignSelf: "center",
    marginVertical: 30
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20
  },
  inputText: {
    fontSize: 16,
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
  },
  searchIcon: {
    position: "absolute",
    right: 30,
    top: 50
  }
});
export default OrderCompleteScreen;
