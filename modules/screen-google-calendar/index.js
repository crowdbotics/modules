import React from "react";
import { Image, StyleSheet, View } from "react-native";

const GoogleCalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="contain" source={require("./assets/calendar.png")} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    flex: 1
  },
  image: {
    width: "100%",
    height: "50%"
  }
});

export default GoogleCalendarScreen;
