import React from "react";
import {
  Text, StyleSheet, View, Image, TouchableOpacity
} from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        // @ts-ignore
        source={require("./assets/welcome.png")}
      />
      <View style={styles.buttonBottom}>
        <Button buttonText="Sign Up" />
        <Button backgroundColor="#fff" color="#000" buttonText="Login" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23AAFA"
  },
  heading: {
    fontSize: 20,
    color: "#fff"
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: "7%",
    width: "100%"
  },
  background: {
    width: 370,
    height: 320,
    left: "15%",
    resizeMode: "contain"
  }
});

export default Welcome;

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.buttonText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
