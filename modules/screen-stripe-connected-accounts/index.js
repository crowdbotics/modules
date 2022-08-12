import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";

const StripeConnectedAccounts = () => {

  return (
    <View style={styles.heading}>
      <Text>Stripe Connected Accounts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    margin: 20,
    flex: 1,
    justifyContent: "space-around"
  }
});

export default {
  title: "StripeConnectedAccounts",
  navigator: StripeConnectedAccounts
};
