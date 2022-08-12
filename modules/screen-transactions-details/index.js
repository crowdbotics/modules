import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const TransactionsDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transactions Details</Text>
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

export default {
  title: "TransactionsDetails",
  navigator: TransactionsDetails
};
