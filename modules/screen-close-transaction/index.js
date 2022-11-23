import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const CloseTransaction = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Close Transaction?</Text>
          <Text style={styles.subheading}>Are you sure you want to close?</Text>
        </View>
        <Image source={require("./assets/warningIcon.png")} />
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyHeading}>Attention!</Text>
        <Text style={styles.bodyText}>
          The process of moving funds will be stalled.
        </Text>
      </View>
      <Button buttonText={"Continue the process"} />
      <Button buttonText={"Cancel"} outline={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  heading: {
    fontSize: 22,
    marginBottom: 10
  },
  subheading: {
    fontSize: 14,
    color: "#8E8E93"
  },
  body: {
    flex: 1,
    padding: 20
  },
  bodyHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#EA4335",
    marginBottom: 10
  },
  bodyText: {
    fontSize: 17,
    color: "#8E8E93",
    width: "70%"
  }
});

export default CloseTransaction;
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginBottom: 20
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
