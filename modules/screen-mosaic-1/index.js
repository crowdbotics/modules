import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const Mosaic1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mosaic 1</Text>
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

export default Mosaic1;
