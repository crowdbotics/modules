import React from "react";
import { Image, View, Text, StyleSheet, ScrollView, TouchableHighlight } from "react-native";

const WalletAddNewScreen = () => {
  return (
    <ScrollView >
      <View>
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
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.walletCard}>
          <View style={styles.myWallet}>
            <Image source={require("./assets/edit.png")} />
          </View>
          <View>
            <Text style={styles.balanceText}>
              $4552.68
            </Text>
            <Text style={styles.balanceContent}>Balance</Text>
          </View>
        </View>
        <View style={styles.walletCardDetailContainer}>
          <View style={styles.walletCardDetail}>
            <View>
              <Text>Wallet</Text>
            </View>
            <View>
              <Text>
                Walletconnect.org
              </Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.walletCardDetail}>
            <View>
              <Text>Status</Text>
            </View>
            <View>
              <Text style={styles.onlineText}>
                Online
              </Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.walletCardDetail}>
            <View>
              <Text>Connect to</Text>
            </View>
            <View>
              <Text>
                app.address.org
              </Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.walletCardDetail}>
            <View>
              <Text>Address</Text>
            </View>
            <View>
              <Text >
                0XCc54..64654f
              </Text>
            </View>
          </View>

        </View>
        <View style={styles.terms}>
            <Text>By clicking connect you allow this app to view your public address. By connecting a wallet, you agree to Terms & Conditions. </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.connectBtn}>
            <Button>Connect</Button>
          </View>
          <View style={styles.cancelBtn}>
            <Button backgroundColor='#F1F1F1' color='#000'>Cancel</Button>
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
  bottomContainer: {
    padding: 10
  },
  walletCard: { backgroundColor: "white", borderRadius: 10, width: "100%", padding: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  myWallet: {
    borderRadius: 10,
    backgroundColor: "#FCF1D6",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80
  },
  walletName: {
    color: "#26292A", fontSize: 14, marginLeft: 10, alignSelf: "center"
  },
  balanceContent: {
    fontSize: 12,
    color: "#7C7C7C",
    alignSelf: "flex-end"

  },
  walletCardDetailContainer: {
    marginTop: 17,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column"
  },
  walletCardDetail: {
    height: 45,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  onlineText: {
    color: "#12D790"
  },
  terms: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 15,
    padding: 15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancelBtn: {
    flex: 1,
    margin: 12,
    borderRadius: 10,
    borderWidth: 1
  },
  connectBtn: {
    flex: 1,
    margin: 12
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F2F7"
  }
});

export default WalletAddNewScreen;
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
