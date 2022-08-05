import React from "react";
import { Text, StyleSheet, View, ScrollView, Image, TextInput } from "react-native";

const WalletTransactionScreen = (params) => {
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
        <View style={styles.tabView}>
          <View style={styles.tabItem}>
            <Text>Send</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Receive</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Switch</Text>
          </View>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Transaction</Text>
          </View>
        </View>

      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.headText}>Search</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Enter'/>
          </View>
          <Image source={require("./assets/Vector.png")} style={styles.mr10}/>
        </View>
        <Text style={styles.headText}>Transactions</Text>
        <View style={styles.tabView}>
          <View style={styles.tabItem}>
            <Text>All</Text>
          </View>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Income</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Expense</Text>
          </View>
        </View>
        <Text style={styles.headText}>Today</Text>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/Icon.png")}
            />
            <View style={styles.textContainer}>
              <Text>BTC Addeed Via 1234</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Text>+21.54 BTC</Text>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/arrow.png")}
            />
            <View style={styles.textContainer}>
              <Text>BTC Addeed Via 1234</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Text>+21.54 BTC</Text>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/transfer.png")}
            />
            <View style={styles.textContainer}>
              <Text>BTC Addeed Via 1234</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Text>+21.54 BTC</Text>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <Image
              source={require("./assets/transfer.png")}
            />
            <View style={styles.textContainer}>
              <Text>BTC Addeed Via 1234</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Text>+21.54 BTC</Text>
          </View>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff"
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
  headText: {
    marginLeft: 10,
    marginVertical: 15
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff"
  },
  bottomContainer: {
    padding: 10,
    backgroundColor: "#fff"
  },
  mr10: {
    marginRight: 10
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

export default WalletTransactionScreen;

const Input = (props) => {
  return (
      <View>
        <TextInput
          style={textStyles.input}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={(num) => props.setValue(num)}
          placeholderTextColor='#ddd'
          editable={props.editable !== false}
        />
        {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
      </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
