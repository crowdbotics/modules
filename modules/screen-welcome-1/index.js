import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Welcome1 = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/background.png")}
      imageStyle={styles.background}>
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
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight,
    justifyContent: "flex-end"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  description: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 60,
    marginTop: 100
  },
  button: {
    flex: 1,
    marginHorizontal: 10
  },
  background: {
    resizeMode: "contain",
    top: -100,
    left: 0,
    right: 0,
    position: "absolute"
  }
});

export default Welcome1;

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
