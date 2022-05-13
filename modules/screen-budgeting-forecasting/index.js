import React from "react";
import { Image, Text, StyleSheet, View, ScrollView } from "react-native";

const BudgetingForecastingScreen = () => {
  return (
    <ScrollView style={{ borderWidth: 1 }}>
    <View>
      <View style={styles.container}>
        <View>
          <Text>Current Balance</Text>
          <Text style={styles.currentBalance}>$35,559.00</Text>
          <Text>Bank Account: 0954 4543 2112 3116</Text>
        </View>
        <View>
          <Image resizeMode="contain" style={{ width: 52, height: 73 }} source={require("./assets/withdraw.png")} />
        </View>
      </View>
      <View style={{ backgroundColor: "#FFF", height: 610 }}>
        <Image resizeMode="contain" style={{ width: "100%", height: "100%" }} source={require("./assets/balance.png")} />
      </View>
      <View style={{ backgroundColor: "#FFF", height: 200 }}>
        <Image resizeMode="contain" style={{ width: "100%", height: "100%" }} source={require("./assets/monthly-spending.png")} />
      </View>
      <View style={{ backgroundColor: "#FFF", height: 600 }}>
        <Image resizeMode="contain" style={{ width: "100%", height: "100%" }} source={require("./assets/total-spending.png")} />
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
  }
});

export default BudgetingForecastingScreen;
