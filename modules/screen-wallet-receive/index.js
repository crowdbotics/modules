import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";

const WalletReceiveScreen = () => {
  return (
    <ScrollView>
      <Image style={styles.walletIcon} source={require("./assets/wallet-receive.png")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  walletIcon: {
    width: "100%"
  }
});

export default WalletReceiveScreen;
