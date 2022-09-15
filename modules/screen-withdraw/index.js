import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const WithdrawScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Withdraw Screen</Text>
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

export default WithdrawScreen;
