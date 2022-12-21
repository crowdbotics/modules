import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

const pressed = () => {
  console.log("pressed");
};

const SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Sign in</Text>
      </View>
      <View>
        <View style={styles.textBox}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.mb35}>
            <Button onPress={pressed} height={50}>
              Sign Up
            </Button>
          </View>
          <Button
            onPress={pressed}
            height={50}
            borderWidth={1}
            backgroundColor="#FFF"
            color="#000"
          >
            Log In
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mb35: {
    marginBottom: 35
  },
  footerContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  text: {
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: "20%"
  },
  welcomeText: {
    fontSize: 26,
    color: "#2F2F2F",
    marginBottom: 16
  },
  textBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 40
  },
  signinText: {
    fontSize: 42,
    fontWeight: "500"
  },
  signinContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 20,
    height: "100%"
  }
});

export default SignIn;

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
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
