import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";

const WalletAddNewScreen = () => {
  return (
    <ScrollView>
      <Image style={styles.walletIcon} source={require("./assets/wallet-add-new.png")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  walletIcon: {
    width: "100%"
  }
});

export default WalletAddNewScreen;
