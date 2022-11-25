import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const LargeGrid1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Large grid-1</Text>
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

export default LargeGrid1;
