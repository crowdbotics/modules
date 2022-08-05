import React from "react";
import { Text, StyleSheet, ScrollView, Image, View, TouchableHighlight } from "react-native";

const FisSubscribeScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}><Image source={require("./assets/fis-logo.png")} /></View>

      <View style={styles.wp50}>
          <View style={styles.tabView}>
            <View style={[styles.tabItem, styles.selectedTab]}>
              <Text>Basic</Text>
            </View>
            <View style={styles.tabItem}>
              <Text>Premium</Text>
            </View>
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.headText}>Basic plan</Text>
              <Text style={styles.t12}>The Best Option</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer2}>$14.00</Text>
           <Text style={styles.balanceText}>per month</Text>
          </View>
        </View>

      <View style={styles.todaysContainer1}>
        <Text style={styles.todayText}>Ideal for everyday</Text>
        <View style={styles.walletInfo1}>
          <View style={styles.infoContainer1}>
            <View style={styles.textContainer1}>
              <Text style={styles.infoText}>Sports Center</Text>
              <Text style={styles.t13}>Earn 2% on all card payment</Text>
            </View>
          </View>

        </View>
        <View style={styles.walletInfo1}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infoText}>Salary</Text>
              <Text style={styles.t13}>Earn 2% on all card payment</Text>
            </View>
          </View>

        </View>
        <View style={styles.walletInfo1}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.infoText}>Sports Center</Text>
              <Text style={styles.t13}>Earn 2% on all card payment</Text>
            </View>
          </View>

        </View>
      </View>
      <View style={styles.button}>
        <Button >Get Basic plan now</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    height: "100%",
    backgroundColor: "#fff"
  },
  logoContainer: { justifyContent: "center", alignItems: "center" },
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginTop: 30,
    marginBottom: 10

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
    fontWeight: "bold",
    flex: 1
  },
  wp50: {
    width: "50%"
  },
  walletInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F7",
    elevation: 10,
    shadowColor: "grey",
    padding: 15,
    marginHorizontal: 5
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 10
  },
  t12: {
    fontSize: 16,
    color: "#ADB1B2"
  },
  t13: {
    fontSize: 12,
    color: "#ADB1B2"
  },
  infoText: { fontSize: 14 },
  balanceContainer2: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold"
  },
  headText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold"
  },
  mainBalanceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  balanceText: { marginTop: 15, marginLeft: 2 },
  todaysContainer1: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0,0,0,0.8)",
    elevation: 10
  },
  todayText: { marginLeft: 22, marginTop: 10, color: "#7C7C7C" },
  walletInfo1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F7"
  },
  infoContainer1: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer1: {
    marginLeft: 10
  },
  button: { justifyContent: "center", alignItems: "center", marginVertical: 50 }
});

export default FisSubscribeScreen;

export const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
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
    borderRadius: 10,
    height: 49,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
