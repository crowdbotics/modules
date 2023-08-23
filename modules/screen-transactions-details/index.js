import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, TouchableHighlight, ScrollView
} from "react-native";

const TransactionsDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Transaction</Text>
          <Text />
        </View>
        <View style={styles.description}>
          <Text style={styles.username}>Transaction</Text>
          <Text style={styles.text}>Details</Text>
        </View>
      </View>
      <View style={styles.borderDiv}></View>
      <View style={styles.imgContainer2}>
        <Image source={require(
          
          "./assets/edit.png")} style={styles.editImg} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.username1}>Sender/Receiver name</Text>
        <Text style={styles.mr10}>Amount paid / received</Text>
        <View style={styles.chooseContainer}>
          <Text style={styles.address}>Total</Text>
          <Text style={styles.amount}>$1244.84</Text>
        </View>
        <Text style={styles.mr10}>Transaction ID</Text>
        <View style={styles.chooseContainer}>
          <Text style={styles.address}>0xdC4592CFBa591e4E243fA35e2e4…</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.mr10}>Date</Text>
          <Text style={[styles.mr10, { marginRight: 60 }]}>Time</Text>
        </View>
        <View style={[styles.chooseContainer, { paddingRight: 30 }]}>
          <Text>24/06/2022</Text>
          <Text>09:00 AM</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button>Make Return</Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  headerContainer: { backgroundColor: "#FFF", paddingHorizontal: 10, paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  description: { paddingHorizontal: 15, marginTop: 20 },
  username: { fontSize: 24, fontWeight: "bold", color: "#2A2B2E" },
  text: { color: "#9A9A9A", paddingRight: 70, marginTop: 5 },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    marginVertical: 25
  },
  imgContainer2: {
    height: 98,
    width: 97,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: -40,
    zIndex: 99
  },
  editImg: { resizeMode: "contain", height: 61, width: 61 },
  infoContainer: { backgroundColor: "#FFF", marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 },
  username1: { fontSize: 19, textAlign: "center", marginBottom: 40, marginTop: 30, fontWeight: "500" },
  mr10: {
    marginLeft: 20,
    marginBottom: 10
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  amount: { fontSize: 20, fontWeight: "bold" },
  address: { color: "#2B2727" },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  borderDiv: { height: 15, borderRadius: 10, marginTop: -5, zIndex: 99, backgroundColor: "#F1F1F1" }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
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
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default TransactionsDetails;
