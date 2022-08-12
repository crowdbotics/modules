import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const LinkedBankAccountsDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Linked Bank Accounts Details</Text>
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
  title: "LinkedBankAccountsDetails",
  navigator: LinkedBankAccountsDetails
};
