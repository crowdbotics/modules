import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const 2Columns = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>2 columns</Text>
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

export default 2Columns;
