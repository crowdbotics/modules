import React from "react";
import {
  Text, StyleSheet, View, Image, TouchableHighlight
} from "react-native";

const TouchID = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Touch ID</Text>
        <Text />
      </View>
      <View style={styles.description}>
        <Text style={styles.username}>Hello, Username</Text>
        <Text style={styles.text}>Use your touch ID for faster, easier access to your account</Text>
      </View>
      <Image source={require("./assets/touch.png")} style={styles.touch} />
      <Text style={[styles.text, styles.align]}>Please wait…</Text>
      <View style={styles.buttonContainer}>
        <Button>login</Button>
      </View>
      <Text style={[styles.align, styles.loginText]}>Don&apos;t have an account?<Text style={styles.signup}> Sign Up</Text></Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  description: { paddingHorizontal: 20, marginTop: 20 },
  username: { fontSize: 22, fontWeight: "bold" },
  text: { color: "#9A9A9A", paddingRight: 70, marginTop: 5 },
  touch: { width: 180, height: 180, resizeMode: "contain", alignSelf: "center", marginTop: 90, marginBottom: 10 },
  align: { textAlign: "center", paddingRight: 0 },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 45
  },
  loginText: { fontSize: 12, color: "#9A9A9A" },
  signup: { color: "#12D790" }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default TouchID;
