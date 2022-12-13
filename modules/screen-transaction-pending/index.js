import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, TouchableHighlight
} from "react-native";

const TransactionPending = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Transaction</Text>
        <Text />
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.description}>
          <Text style={styles.username}>Transaction pending</Text>
          <Text style={styles.text}>See details</Text>
        </View>
        <Image source={require("./assets/clock.png")} style={styles.clock} />
      </View>
      </View>
      <View style={[styles.description, styles.align]}>
          <Text style={[styles.mb5]}>Transaction ID</Text>
          <Text style={styles.text}>Lorem ipsum dolor sit amet,</Text>
          <Text style={styles.text}>consectetur adipiscing elit. Hac. </Text>
        </View>

        <Text style={styles.mr10}>Transaction ID</Text>
      <View style={styles.chooseContainer}>
        <Text style={styles.address}>0xdC4592CFBa591e4E243fA35e2e4…</Text>
        <Image source={require("./assets/copy.png")} style={styles.nextImg} />
      </View>
      <View style={styles.buttonContainer}>
        <Button>Done</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  headerContainer: { backgroundColor: "#F1F1F1", paddingHorizontal: 10, paddingBottom: 25 },
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
  username: { fontSize: 22, fontWeight: "bold", color: "#2A2B2E" },
  text: { color: "#9A9A9A", paddingRight: 70, marginTop: 5 },
  align: { marginHorizontal: 10, marginBottom: 30 },
  mb5: { fontSize: 22, fontWeight: "bold", marginBottom: 5, color: "#333333" },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  clock: { width: 66, height: 66, resizeMode: "contain", marginRight: 20 },
  mr10: {
    marginLeft: 35,
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
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 20,
    marginBottom: 20
  },
  nextImg: { width: 16, height: 16, resizeMode: "contain" },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    bottom: 20,
    width: "100%"
  },
  address: { color: "#2B2727" }
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

export default TransactionPending;
