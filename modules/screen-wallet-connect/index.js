import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";

const WalletConnectScreen = () => {
  return (
    <View style={styles.connectText}>
      <Image style={styles.walletIcon} source={require("./assets/walletIcon.png")} />
      <Text style={styles.fwb}>Connect your Wallet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  connectText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  walletIcon: {
    marginBottom: 10
  },
  fwb: {
    fontWeight: "bold"
  }
});

export default WalletConnectScreen;
