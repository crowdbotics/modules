import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const BarcodeScanner = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Barcode scan</Text>
        <Image source={require("./assets/image.png")} />
      </View>
      <View style={styles.barCode}>
        <Text style={styles.barText}>Align Barcode to fit inside the farm</Text>
        <Image source={require("./assets/barcode.png")} style={styles.img} />
      </View>
      <Text style={styles.mainHeading}>Scan details</Text>
      <View style={styles.info}>
        <Text style={styles.heading}>Order name</Text>
        <Text style={styles.text}>No. #0556465465</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.heading}>Company name</Text>
        <Text style={styles.text}>Address:</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.heading}>Website</Text>
          <Text style={styles.text}>https:// </Text>
        </View>
        <View>
          <Text style={styles.heading}>Phone number</Text>
          <Text style={styles.text}>+1554546546546</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15
  },
  barText: {
    alignSelf: "auto"
  },
  barCode: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "50%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 15
  },
  img: {
    height: "70%",
    width: "90%",
    marginBottom: 30,
    resizeMode: "contain"
  },
  mainHeading: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 30
  },
  info: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff"
  },
  heading: {
    fontSize: 22
  },
  text: {
    color: "#7C7C7C",
    fontSize: 14
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  }
});

export default BarcodeScanner;
