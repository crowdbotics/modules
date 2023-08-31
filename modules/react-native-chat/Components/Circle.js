import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
const styles = StyleSheet.create({
  container: {
  },
  shape: {
    width: 42,
    height: 42,
    borderRadius: 50
  },
  text: {
    textTransform: "uppercase",
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
});
const Circle = ({ letter, source }) => (
  <View style={styles.container}>
    {source
      ? <Image source={{ uri: source }} style={styles.shape} />
      : <LinearGradient colors={["#4CAF50", "#4CAF50"]} start={{ x: 0.1, y: 0.2 }} style={styles.shape}>
        <Text style={styles.text}>{letter}</Text>
      </LinearGradient>
    }
  </View>
);
export default Circle;
