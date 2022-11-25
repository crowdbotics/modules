import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const ThreeColumns = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>three columns</Text>
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

export default ThreeColumns;
