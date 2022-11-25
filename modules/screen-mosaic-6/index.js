import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const Mosaic6 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mosaic 6</Text>
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

export default Mosaic6;
