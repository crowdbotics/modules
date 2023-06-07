import React from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";

const StripeConnect = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer} />
      <View style={styles.lowerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./assets/stripeLogo.png")}
            style={styles.image}
          />
        </View>
        <Button buttonText="Connect with stripe" style={styles.button} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  lowerContainer: {
    flex: 2,
    backgroundColor: "#f1f1f1"
  },
  upperContainer: {
    flex: 1
  },
  button: {
    marginHorizontal: 40,
    marginTop: 120
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 75,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -70,
    left: 125
  },
  image: {
    width: 50,
    height: 100,
    resizeMode: "contain"
  }
});

export default StripeConnect;

const Button = params => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
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
