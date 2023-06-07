import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable
} from "react-native";

const InAppTutorial = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.thumbnail}
        source={require("./assets/thumbnail.png")}>
        <Image
          source={require("./assets/playButtonIcon.png")}
          style={styles.playButton}
        />
      </ImageBackground>
      <Image
        source={require("./assets/sliderIcon.png")}
        style={styles.sliderIcon}
      />
      <Button buttonText="Proceed" style={styles.button} />
      <Button
        buttonText="Skip"
        style={styles.button}
        color="white"
        textColor="#000"
        hideShadow={true}>
        <Image
          source={require("./assets/rightArrowIcon.png")}
          style={styles.arrowIcon}
        />
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  thumbnail: {
    width: 330,
    height: 440,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden"
  },
  playButton: {
    width: 60,
    height: 60
  },
  sliderIcon: {
    width: 40,
    height: 10,
    alignSelf: "center"
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  arrowIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginLeft: 10
  }
});

export default InAppTutorial;
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
