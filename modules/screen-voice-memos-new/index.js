import React from "react";
import { StyleSheet, View, Image } from "react-native";

const VoiceMemosNew = (params) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("./preview.png")} style={styles.img}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  img: {
    height: "100%",
    width: "100%"
  }

});

export default VoiceMemosNew;
