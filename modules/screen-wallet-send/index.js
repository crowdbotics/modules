import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";

const WalletSendScreen = () => {
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
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Send</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Receive</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Switch</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Transactions</Text>
          </View>
        </View>
        <View style={styles.totalAmount}>
          <View style={styles.amountText}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.sendText}>Available to send</Text>
          </View>
          <Text style={styles.priceText}>$1244.84</Text>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.label}>From</Text>
          <View style={styles.inputField}>
            <Input placeholder="Enter" />
          </View>
        </View>

        <View>
          <Text style={styles.label}>To</Text>
          <View style={styles.inputIcon}>
            <View style={styles.flexOne}>
              <Input placeholder="Receiver Address" />
            </View>
            <Image
              style={styles.qrIcon}
              source={require("./assets/qrcode.png")}
            />
          </View>
        </View>

        <View style={styles.inputArea}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.inputField}>
            <Input placeholder="Enter" />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Button>Send</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF"
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
    marginTop: 25,
    width: 120
  },
  getAccount: {
    marginRight: 5,
    marginTop: 4
  },
  balanceText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  balanceTxt: {
    color: "#7C7C7C",
    fontSize: 14,
    alignSelf: "flex-end",
    textAlign: "right",
    fontWeight: "bold"
  },
  walletBalance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    marginTop: 14,
    paddingHorizontal: 23
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
  totalAmount: {
    padding: 14,
    height: 113,
    shadowColor: "rgba(0, 0, 0, 0.20)",
    elevation: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  amountText: {
    display: "flex",
    flexDirection: "column"
  },
  totalText: {
    fontSize: 24,
    paddingLeft: 16,
    fontWeight: "600"
  },
  sendText: {
    fontSize: 13,
    paddingLeft: 16,
    fontWeight: "300"
  },
  priceText: {
    fontSize: 23,
    paddingRight: 16,
    fontWeight: "600"
  },
  label: {
    fontSize: 14,
    paddingLeft: 18,
    paddingBottom: 8
  },
  inputArea: {
    paddingTop: 16,
    paddingBottom: 16
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 10
  },
  inputIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 10
  },
  qrIcon: {
    marginRight: 16
  },
  btnContainer: {
    marginTop: "20%"
  }
});

export default WalletSendScreen;

const Button = (props) => {
  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor || "#000000",
            height: props.height || 49
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}
        >
          {props.children}
        </Text>
      </View>
    </Pressable>
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

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#ddd"
        editable={props.editable !== false}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 15
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
