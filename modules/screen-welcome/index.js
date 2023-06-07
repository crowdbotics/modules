import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";

const WelcomeScreen = (params) => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/companyLogo.png")} style={styles.logo} />
      <Text style={styles.mainText}>Welcome back!</Text>
      <Text style={styles.subText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor.
      </Text>
      <Button buttonText={"Sign Up"} />
      <Button buttonText={"Log In"} outline={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingBottom: 50
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center"
  },
  mainText: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center"
  },
  subText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    textAlign: "center",
    marginHorizontal: 40,
    marginVertical: 10
  }
});
export default WelcomeScreen;

const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
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
