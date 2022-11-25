import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const 1Columns = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>1 columns</Text>
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

export default 1Columns;
