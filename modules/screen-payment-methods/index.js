import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, ScrollView
} from "react-native";

const PaymentMethods = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Payment</Text>
        <Text />
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.review}>Payment Methods</Text>
        <Text style={styles.edit}>Free</Text>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Cards</Text>
        <View style={[styles.walletCard, styles.borderTop]}>
          <Image
            source={require("./assets/card.png")}
            style={styles.image}
          />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Master Card ending **09</Text>
            <Text style={styles.eventType}>Added on Nov 23, 2022</Text>
          </View>
        </View>

        <View style={[styles.walletCard, styles.deleteCard]}>
          <View style={styles.walletCarder}>
            <Text style={[styles.eventName, styles.mr10]}>Master Card ending **09</Text>
            <Text style={[styles.eventType, styles.mr10]}>Added on Nov 23, 2022</Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={require("./assets/delete.png")}
              style={styles.delete}
            />
          </View>
        </View>

        <View style={styles.walletCard}>
          <Image
            source={require("./assets/pay.png")}
            style={styles.image}
          />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Paypal - john***@g***.com</Text>
            <Text style={styles.eventType}>Added on Nov 23, 2022</Text>
          </View>
        </View>
        <Image
            source={require("./assets/add.png")}
            style={styles.add}
          />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  reviewContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 20, marginVertical: 15 },
  review: { fontSize: 16, color: "#231F20" },
  edit: { color: "#12D790", fontSize: 16 },
  listContainer: { flex: 1, backgroundColor: "#FFF", marginTop: 30, paddingHorizontal: 10, paddingBottom: 25 },
  walletCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 17,
    marginLeft: 20
  },
  eventType: {
    color: "#6A6A6A",
    fontSize: 12,
    marginLeft: 20,
    width: 200,
    marginVertical: 5
  },
  image: { resizeMode: "contain", height: 26, width: 38, marginTop: -5 },
  title: { fontSize: 24, marginLeft: 20, marginTop: 15, marginBottom: 20, fontWeight: "bold" },
  deleteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
    paddingLeft: -10,
    paddingRight: -10
  },
  delete: { resizeMode: "contain", height: 24, width: 22 },
  imgContainer: { justifyContent: "center", alignItems: "center", backgroundColor: "#EA4335", height: 70, width: "25%" },
  borderTop: {
    borderTopColor: "#F2F2F2",
    borderTopWidth: 1
  },
  mr10: { marginLeft: 0 },
  add: { resizeMode: "contain", height: 74, width: 77, alignSelf: "center", marginTop: 50 }
});

export default PaymentMethods;
