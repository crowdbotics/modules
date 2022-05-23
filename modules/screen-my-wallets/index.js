import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";

const MyWalletsScreen = () => {
  return (
    <ScrollView>
      <Image style={styles.walletIcon} source={require("./assets/my-wallets.png")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  walletIcon: {
    width: "100%"
  }
});

export default MyWalletsScreen;
