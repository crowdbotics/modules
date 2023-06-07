import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const RideShareWelcome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/mapsIcon.png")}
        style={styles.mapsIcon}
      />
      <Text style={styles.heading}>Hi, nice to meet you?</Text>
      <Text style={styles.subHeading}>
        Choose your location to start exploring places around you
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          buttonText="Get Started"
          outlineColor="#000"
          textColor="#000"
          color="#fff"
          style={styles.button}
        />
        <Button buttonText="Connect" style={styles.button}>
          <Image
            source={require("./assets/facebookIcon.png")}
            style={styles.facebookIcon}
          />
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  mapsIcon: {
    width: 70,
    height: 70,
    marginBottom: 30
  },
  heading: {
    fontSize: 30,
    color: "#2F2F2F",
    marginBottom: 10
  },
  subHeading: {
    fontSize: 18,
    color: "#505050",
    textAlign: "center",
    width: "60%"
  },
  buttonsContainer: {
    justifyContent: "space-around"
  },
  button: {
    marginTop: 30,
    marginBottom: 70,
    width: 300
  },
  facebookIcon: {
    width: 20,
    height: 20,
    marginLeft: 10
  }
});

export default RideShareWelcome;

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
