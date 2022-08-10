import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const WalletSwitchValidation = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require("./assets/Icon.png")}/>
        <Text style={styles.heading}>Validate transaction</Text>
      </View>
      <View style={styles.keyContainer}>
        <View style={styles.key}>
          <Text>Public key</Text>
          <Text style={styles.addressTxt}>0x546545..00005</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.key}>
          <Text>Private key</Text>
          <Text style={styles.addressTxt}>0x546545..00005</Text>
        </View>

      </View>
      <View style={styles.text}>
        <Text style={styles.innerText}>
        Transaction has been officially recorded and verified, the payment will be processed, and it can no longer be reversed.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  head: {
    justifyContent: "center",
    alignItems: "center"
  },
  keyContainer: {
    padding: 10,
    shadowColor: "rgba(0,0,0,0.2)",
    elevation: 15,
    marginBottom: 15,
    borderRadius: 10
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15
  },
  key: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F2F7",
    marginHorizontal: 10
  },
  text: {
    padding: 10,
    shadowColor: "rgba(0,0,0,0.2)",
    elevation: 10,
    borderRadius: 10
  },
  innerText: {
    padding: 10,
    borderRadius: 10
  },
  addressTxt: {
    color: "#7C7C7C",
    fontSize: 12
  }

});

export default WalletSwitchValidation;
