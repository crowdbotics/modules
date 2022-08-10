import React from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";

const BudgetingForecastingScreen = () => {
  return (
    <ScrollView>
    <View>
      <View style={styles.container}>
        <View>
          <Text>Current Balance</Text>
          <Text style={styles.currentBalance}>$35,559.00</Text>
          <Text>Bank Account: 0954 4543 2112 3116</Text>
        </View>
        <View>
          <Image resizeMode="contain" style={styles.withdrawImage} source={require("./assets/withdraw.png")} />
        </View>
      </View>
      <View style={styles.balanceImage}>
        <Image resizeMode="contain" style={styles.imageHW} source={require("./assets/balance.png")} />
      </View>
      <View style={styles.monthlySpendingImage}>
        <Image resizeMode="contain" style={styles.imageHW} source={require("./assets/monthly-spending.png")} />
      </View>
      <View style={styles.totalSpendingImage}>
        <Image resizeMode="contain" style={styles.imageHW} source={require("./assets/total-spending.png")} />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginVertical: 20
  },
  currentBalance: {
    fontSize: 36,
    marginVertical: 5
  },
  withdrawImage: {
    width: 52,
    height: 73
  },
  balanceImage: {
    backgroundColor: "#FFF",
    height: 610
  },
  monthlySpendingImage: {
    backgroundColor: "#FFF",
    height: 200
  },
  totalSpendingImage: {
    backgroundColor: "#FFF",
    height: 600
  },
  imageHW: {
    width: "100%",
    height: "100%"
  }
});

export default BudgetingForecastingScreen;
