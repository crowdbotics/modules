import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const ConnectionFailed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connection Failed</Text>
      <Text style={styles.subText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque.
      </Text>
      <View style={styles.imageContainer}>
        <Image source={require("./assets/warningIcon.png")} />
      </View>
      <Button buttonText={"Try Again"} />
      <Text style={styles.bottomText}>
        <Text style={styles.grey}>
          Please double check or go to{" "}
          <Text style={styles.green}>Settings</Text>
        </Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 60
  },
  heading: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10
  },
  subText: {
    fontSize: 14,
    color: "#9A9A9A",
    width: "70%"
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  bottomText: {
    fontSize: 12,
    textAlign: "center"
  },
  grey: {
    color: "#9A9A9A"
  },
  green: {
    color: "#12D790"
  }
});

export default ConnectionFailed;

const Button = params => {
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
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
