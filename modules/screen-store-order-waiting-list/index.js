import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const OrderWaitingListScreen = (params) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername("User");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.grayArea}></View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.heading}>Hi {username},</Text>
          <Text style={styles.subHeading}>Thank You for the order.</Text>
          <Text style={styles.detailText}>
            Below you will see your position in the queue:
          </Text>
        </View>
        <Image
          source={require("./assets/waitingIcon.png")}
          style={styles.image}
        />
        <Image source={require("./assets/3Dots.png")} style={styles.image} />
        <View style={styles.footer}>
          <Text style={styles.subHeading}>
            You will receive text or email when we&apos;re ready to accept your
            order
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  grayArea: {
    backgroundColor: "#DADADA",
    height: 150,
    width: "100%"
  },
  content: {
    paddingTop: 20,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
    width: "100%"
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold"
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center"
  },
  detailText: {
    fontSize: 14,
    textAlign: "center",
    color: "grey",
    marginTop: 30
  },
  image: {
    alignSelf: "center",
    marginVertical: 20
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  searchIcon: {
    position: "absolute",
    right: 30,
    top: 50
  },
  footer: {
    marginHorizontal: 40
  }
});
export default OrderWaitingListScreen;
