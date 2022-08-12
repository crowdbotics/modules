import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const PassengerProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Passenger Profile</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  }
});

export default {
  title: "PassengerProfile",
  navigator: PassengerProfile
};
