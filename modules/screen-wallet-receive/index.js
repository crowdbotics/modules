import React from "react";
import { Image, Text, View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";

const WalletReceiveScreen = () => {
  return (
    <ScrollView >
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
        <View style={styles.tabView}>
          <View style={styles.tabItem}>
            <Text>Send</Text>
          </View>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Receive</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Switch</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Transactions</Text>
          </View>
        </View>
        <Text style={styles.ReceiveTransaction}>Receive Transaction</Text>
        <View style={styles.receive}>
          <View style={styles.qrCode}>
            <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={require("./assets/qrcode.png")} />
          </View>
        </View>
        <View style={styles.cardWallet}>
          <View style={styles.walletDetails}>
            <View style={styles.contentContainer}>
              <Text>Wallet address</Text>
              <Text>0x546545..00005</Text>
            </View>
            <Text>Copy</Text>
          </View>
          <View style={styles.border}></View>
          <View style={styles.walletDetails}>
          <View style={styles.contentContainer}>
              <Text>Match wallet</Text>
              <Text>8.52456546</Text>
          </View>
          <Text style={styles.priceText}>$1244.84</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button>Receive</Button>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF"
  },
  walletIcon: {
    width: "100%"
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
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold"
  },
  receive: { display: "flex", flex: 1, alignSelf: "center", marginTop: 25 },
  ReceiveTransaction: {
    margin: 30,
    fontSize: 16,
    fontWeight: "bold"
  },
  qrCode: {
    borderColor: "#C4C4C4", borderWidth: 2, padding: 25, borderRadius: 10
  },
  btnContainer: {
    margin: 30
  },
  cardWallet: {
    padding: 14,
    shadowColor: "lightgrey",
    elevation: 10,
    height: 134,
    borderRadius: 10
  },
  walletDetails: {
    paddingTop: 12,
    paddingLeft: 14,
    paddingRight: 14,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  border: {
    borderWidth: 1,
    borderColor: "#F0F2F7",
    marginHorizontal: 14,
    marginTop: 6
  },
  priceText: {
    fontSize: 14,
    color: "#12D790"
  },
  contentContainer: {
    display: "flex", flexDirection: "column"
  }
});

export default WalletReceiveScreen;

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} disabled={props.disabled} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
