import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Welcome2 = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("./assets/background2.png")}
      />
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
      </Text>
      <View style={styles.buttonContainer}>
        <Button buttonText="Sign Up" style={styles.button} />
        <Button
          buttonText="Login"
          style={styles.button}
          borderColor="#000"
          backgroundColor="#fff"
          textColor="#000"
          hideShadow
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  description: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    paddingHorizontal: 40,
    marginVertical: 20
  },
  buttonContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  background: {
    width: 400,
    height: 350
  }
});

export default Welcome2;

const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
