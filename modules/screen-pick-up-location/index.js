import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const PickUpLocation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick Up Location</Text>
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
  title: "PickUpLocation",
  navigator: PickUpLocation
};
