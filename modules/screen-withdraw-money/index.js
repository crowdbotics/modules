import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, TextInput, ScrollView, TouchableHighlight
} from "react-native";

const WithdrawMoney = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Withdraw</Text>
        <Image source={require("./assets/move.png")} style={styles.move} />
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.imgContainer2}>
          <Image source={require(
            // @ts-ignore
            "./assets/edit.png")} style={styles.editImg} />
        </View>
        <View style={styles.description}>
          <Text style={styles.username}>$1244.84</Text>
          <Text style={styles.text}>Balance</Text>
        </View>
      </View>

      <View style={[styles.statusContainer, styles.mt10]}>
        <View>
          <Text style={styles.withdraw}>Withdraw</Text>
          <View style={styles.tabView}>
            <View style={[styles.tabItem, styles.selectedTab]}>
              <Text style={styles.tabText}>Withdraw</Text>
            </View>
          </View>
        </View>
        <Image source={require(
          // @ts-ignore
          "./assets/down.png")} style={styles.down} />
      </View>
      <Text style={styles.title}>Enter amount</Text>
      <View style={[styles.chooseContainer]}>
        <Image source={require("./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder='1.100.00' placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require("./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.ruleContainer}>
        <Text style={styles.ruleTitle}>Cash out rules</Text>
        <Text style={styles.ruleText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam morbi sit urna interdum phasellus sit.</Text>
      </View>
      <View style={styles.ruleList}>
        <View style={styles.ruleOut}>
          <Text style={styles.cashOut}>Cash out fee</Text>
          <Text style={styles.ruleText}>Amount</Text>
        </View>
        <Text style={styles.outAmount}>$3.00</Text>
      </View>
      <View style={styles.ruleList}>
        <View style={styles.ruleOut}>
          <Text style={styles.netCash}>Net Cash out</Text>
          <Text style={styles.ruleText}>Amount</Text>
        </View>
        <Text style={styles.netAmount}>$1.103.00</Text>
      </View>
      <View style={styles.buttonBottom}>
        <Button>Confirm</Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain" },
  move: { width: 24, height: 24, resizeMode: "contain", marginRight: -5 },
  heading: { fontSize: 16, color: "#000", alignSelf: "center" },
  description: { marginTop: 10 },
  username: { fontSize: 20, fontWeight: "bold" },
  text: { color: "#9A9A9A", marginTop: 5, marginLeft: 35 },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  mt10: { marginTop: 30 },
  imgContainer2: {
    height: 61,
    width: 61,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 60
  },
  editImg: { resizeMode: "contain", height: 32, width: 32 },
  down: { resizeMode: "contain", height: 33, width: 30, marginRight: 10, marginBottom: -10 },
  tabView: {
    width: 100,
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 10,
    marginLeft: -5
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabText: { fontSize: 12 },
  withdraw: { fontWeight: "bold", marginLeft: 5 },
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 20, color: "#2A2B2E", marginBottom: 10 },

  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 20,
    marginRight: 10,
    marginLeft: 20,
    marginTop: 30
  },
  priceImg: { width: 27, height: 27, resizeMode: "contain" },
  inputPrice: { fontWeight: "bold", fontSize: 16, width: 100, textAlign: "center" },
  ruleContainer: {
    margin: 20,
    paddingBottom: 20,
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1
  },
  ruleTitle: { fontWeight: "bold", marginBottom: 5 },
  ruleText: { fontSize: 11 },
  ruleList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingBottom: 15,
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1,
    marginBottom: 15
  },
  cashOut: { fontSize: 18, color: "#313633" },
  outAmount: { color: "#7C7C7C", fontSize: 26 },
  netCash: { fontSize: 22, color: "#313633" },
  netAmount: { color: "#000", fontSize: 26 },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default WithdrawMoney;
