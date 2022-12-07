import React from "react";
import {
  Text, StyleSheet, View, Image, TouchableOpacity
} from "react-native";

// @ts-ignore
const Onboarding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.prev]}>
      <Image source={require(
          // @ts-ignore
          "./assets/prev.png")} style={styles.prevImg} />
        <Text style={styles.prevText}>Prev</Text>
      </TouchableOpacity>
      <Image
        style={styles.background}
        // @ts-ignore
        source={require("./assets/welcome.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Find your trusted{'\n'}Doctor</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At habitant metus, enim varius in. Morbi diam vel varius cras. </Text>
        <Image source={require(
          // @ts-ignore
          "./assets/dots.png")} style={styles.dots} />
      </View>
      <TouchableOpacity style={styles.buttonBottom}>
        <Text style={styles.text}>Next</Text>
        <Image source={require(
          // @ts-ignore
          "./assets/next.png")} style={styles.next} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23AAFA"
  },
  heading: {
    fontSize: 20,
    color: "#fff"
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: '7%',
    width: '100%'
  },
  background: {
    width: 370,
    height: 320,
    left: '15%',
    resizeMode: "contain",
  },
  text: { color: "#fff", fontSize: 22, marginRight: 10, textAlign: "center" },
  next: { width: 14.17, height: 11.25, resizeMode: "contain", marginTop: 3 },
  dots: { height: 6, width: 45, resizeMode: "contain", marginTop: 20 },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '7%'
  },
  title: { fontSize: 24, color: "#FFF", textAlign: "center", lineHeight: 32 },
  description: { fontSize: 14, color: "#FFF", textAlign: "center", lineHeight: 24, paddingHorizontal: '15%', opacity: 0.7, marginVertical: "2%" },
  prev: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: '5%',
    width: '100%'
  },
  prevImg:{ width: 20, height: 18, resizeMode: "contain", marginTop: 3 },
  prevText:{fontSize: 16, color: "#000", opacity: 0.2, marginLeft: 7}
});

export default Onboarding;

