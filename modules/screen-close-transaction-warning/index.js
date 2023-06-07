import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const CloseTransactionWarning = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Text style={styles.mainHeading}>Are you sure you want to close?</Text>
        <View style={styles.iconContainer}>
          <Image
            source={require("./assets/alertIcon.png")}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.lower}>
        <Text style={styles.heading}>
          The process for moving funds will be stalled
        </Text>
        <Button
          buttonText="Continue the process"
          style={styles.button}
          hideShadow
        />
        <Button
          buttonText="Cancel"
          borderColor="#000"
          backgroundColor="#fff"
          textColor="#000"
          hideShadow
          style={styles.button}
        />
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
    backgroundColor: "#D9D9D9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "flex-end"
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
  mainHeading: {
    fontSize: 24,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 70,
    marginTop: 60,
    width: "50%"
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    width: "70%",
    color: "#1E2022"
  },
  button: {
    marginTop: 20,
    marginHorizontal: 40
  }
});

export default CloseTransactionWarning;
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
