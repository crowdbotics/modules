import React from "react";
import { Image, View, Text, StyleSheet, ScrollView } from "react-native";

const MyWalletsScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.top}>
        <View style={[styles.account]}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={[styles.pt10, styles.balance]}>
          <View>
            <Text style={styles.balanceText}>$1244.84</Text>
            <Text style={styles.balanceTxt}>Balance</Text>
          </View>
        </View>
      </View>
      <Text>Wallets</Text>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text>Send</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Receive</Text>
        </View>
      </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.walletHead}>
          <Text>List of wallets</Text>
          <Text>Balance</Text>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/Icon.png")}
            />
            <View style={styles.textContainer}>
              <Text>Ethereum</Text>
              <Text style={styles.t12}>ETH</Text>
            </View>
          </View>
          <View>
            <Text>$1.893,04</Text>
            <Text style={styles.balanceContainer}>+%11.89</Text>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/Icon.png")}
            />
            <View style={styles.textContainer}>
              <Text>Ethereum</Text>
              <Text style={styles.t12}>ETH</Text>
            </View>
          </View>
          <View>
            <Text>$1.893,04</Text>
            <Text style={styles.balanceContainer}>+%11.89</Text>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/Icon.png")}
            />
            <View style={styles.textContainer}>
              <Text>Ethereum</Text>
              <Text style={styles.t12}>ETH</Text>
            </View>
          </View>
          <View>
            <Text>$1.893,04</Text>
            <Text style={styles.balanceContainer}>+%11.89</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  flexOne: {
    flex: 1
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  account: {
    width: 61,
    height: 61,
    backgroundColor: "#D9DADD",
    borderRadius: 30.5,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  accountText: { width: 115 },
  pt10: { paddingVertical: 10 },
  balance: { display: "flex", flexDirection: "row", marginTop: 15 },
  switched: {
    marginTop: 25, width: 120
  },
  getAccount: {
    marginRight: 5, marginTop: 4
  },
  balanceText: {
    fontSize: 20, fontWeight: "bold"
  },
  balanceTxt: {
    color: "#7C7C7C", fontSize: 14, alignSelf: "flex-end", textAlign: "right", fontWeight: "bold"
  },
  walletBalance: {
    display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 28, marginTop: 14, paddingHorizontal: 23
  },
  walletText: {
    fontSize: 16
  },
  tabView: {
    width: "50%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    marginTop: 10
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    height: "100%",
    width: "45%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold"
  },
  walletHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10
  },
  bottomContainer: {
    padding: 10
  },
  walletInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 10
  },
  t12: {
    fontSize: 12,
    color: "#ADB1B2"
  },
  balanceContainer: {
    fontSize: 12,
    color: "#12D790",
    alignSelf: "flex-end"
  }

});

export default MyWalletsScreen;
