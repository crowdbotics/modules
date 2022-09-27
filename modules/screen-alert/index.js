import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const Alert = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alert</Text>
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

export default Alert;
