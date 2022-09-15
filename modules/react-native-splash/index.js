import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Hide the splash image as this component is loaded.
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
     <Text style={styles.text}>Welcome Onboard!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  text: { fontSize: 18, fontWeight: "bold" }

});

export default {
  title: "Splash",
  navigator: Splash
};
