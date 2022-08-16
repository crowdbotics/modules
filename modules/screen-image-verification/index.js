import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const ImageVerification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Image Verification</Text>
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

export default ImageVerification;
