import React from "react";
import { StyleSheet, View, Image } from "react-native";

const QRScannerScreen = (params) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("./assets/qrCode.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
export default QRScannerScreen;
