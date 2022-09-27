import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const ProfileSetupSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={styles.greenCircle}>
        <Image source={require("./assets/checkIcon.png")} style={styles.icon} />
      </View>
      <Text style={styles.heading}>Your profile has been setup</Text>
      <Text style={styles.subHeading}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
        purus sit amet luctus,
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  greenCircle: {
    width: 80,
    height: 80,
    borderRadius: 75,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  icon: {
    width: 40,
    height: 40
  },
  heading: {
    fontSize: 32,
    color: "#000",
    textAlign: "center",
    width: "80%",
    marginBottom: 20
  },
  subHeading: {
    fontSize: 16,
    color: "#8A8A8E",
    textAlign: "center",
    width: "90%"
  }
});

export default ProfileSetupSuccess;
