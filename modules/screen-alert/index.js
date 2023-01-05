import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const Alert = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.iconContainer}>
          <Image
            source={require("./assets/alertIcon.png")}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.lower}>
        <Text style={styles.heading}>Successfully{"\n"}removed/deleted</Text>
        <Button buttonText="Close" style={styles.button} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  upper: {
    flex: 3,
    backgroundColor: "#F5A19A",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  lower: {
    flex: 4
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -50,
    left: 150
  },
  icon: {
    width: 70,
    height: 70
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 60
  },
  button: {
    marginTop: 20,
    marginHorizontal: 40
  }
});

export default Alert;
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
