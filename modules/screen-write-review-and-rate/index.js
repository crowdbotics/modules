import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const WriteReviewAndRate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Write Review And Rate</Text>
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

export default WriteReviewAndRate;
