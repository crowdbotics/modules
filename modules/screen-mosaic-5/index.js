import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const Mosaic5 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mosaic 5</Text>
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

export default Mosaic5;
