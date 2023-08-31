import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, TextInput, ScrollView
} from "react-native";

const TransactionsFilterList = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Transaction</Text>
          <Text />
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.imgContainer2}>
            <Image source={require(

              "./assets/edit.png")} style={styles.editImg} />
          </View>
          <View style={styles.description}>
            <Text style={styles.username}>$1244.84</Text>
            <Text style={styles.text}>Balance</Text>
          </View>
        </View>
      </View>
      <Text style={styles.mrSearch}>Search</Text>
      <View style={styles.searchContainer}>
        <View style={styles.chooseContainer}>
          <TextInput placeholder="Enter" placeholderTextColor="#000" />
          <Image source={require(

            "./assets/search.png")} style={styles.search} />
        </View>
        <Image source={require(

          "./assets/file.png")} style={styles.file} />
      </View>

      <View style={styles.dateContainer}>
      <Image source={require(

        "./assets/cross.png")} style={styles.cross} />
        <View style={styles.feeContainer}>
          <View>
            <Text style={[styles.mr10]}>Start date</Text>
            <View style={styles.feeSection}>
              <TextInput placeholder="Enter" placeholderTextColor="#000"/>
              <Image source={require(

                "./assets/calender.png")} style={styles.calender} />
            </View>
          </View>
          <View>
            <Text style={[styles.mr10]}>End date</Text>
            <View style={styles.feeSection}>
            <TextInput placeholder="Enter" placeholderTextColor="#000"/>
              <Image source={require(

                "./assets/calender.png")} style={styles.calender} />
            </View>
          </View>
        </View>
        <Text style={styles.mr10}>Transactions</Text>
        <View style={[styles.chooseContainer, styles.searchTo]}>
          <Text>All</Text>
          <Image source={require(

            "./assets/down.png")} style={styles.down} />
        </View>
      </View>

      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text style={styles.tabText}>Loads</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText]}>Cash out</Text>
        </View>
      </View>
      <Text style={styles.subHeading}>Transactions</Text>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer]}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Sender name</Text>
            <Text style={styles.eventType}>07/06/2022</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
          <Text style={styles.view}>11:30 am</Text>
          <Text style={styles.reject}>1.254.21$</Text>
        </View>
      </View>

      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer]}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Sender name</Text>
            <Text style={styles.eventType}>07/06/2022</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
          <Text style={styles.view}>11:30 am</Text>
          <Text style={styles.reject}>1.254.21$</Text>
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer]}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Sender name</Text>
            <Text style={styles.eventType}>07/06/2022</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
          <Text style={styles.view}>11:30 am</Text>
          <Text style={styles.reject}>1.254.21$</Text>
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer]}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.image}
            />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Sender name</Text>
            <Text style={styles.eventType}>07/06/2022</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
          <Text style={styles.view}>11:30 am</Text>
          <Text style={styles.reject}>1.254.21$</Text>
        </View>
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
  headerContainer: { backgroundColor: "#F1F1F1", paddingHorizontal: 10, paddingBottom: 50, marginBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  description: { marginTop: 10, marginRight: 10 },
  username: { fontSize: 20, fontWeight: "bold" },
  text: { color: "#9A9A9A", marginTop: 5, marginLeft: 35 },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  imgContainer2: {
    height: 61,
    width: 61,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 60,
    marginLeft: 20
  },
  editImg: { resizeMode: "contain", height: 32, width: 32 },
  tabView: {
    width: "65%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 30,
    marginLeft: 10
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
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabText: { fontSize: 12 },
  subHeading: { fontSize: 16, marginLeft: 13, marginVertical: 10 },
  walletCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    color: "#ADB1B2",
    fontSize: 12,
    marginLeft: 10,
    width: 115,
    marginVertical: 5
  },
  view: {
    fontSize: 12,
    color: "#ADB1B2",
    paddingBottom: 3,
    marginRight: -25
  },
  reject: {
    fontSize: 18,
    paddingHorizontal: 10
  },
  imgContainer: {
    height: 46,
    width: 46,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "contain", height: 24, width: 24 },
  leftSection: { justifyContent: "center", alignItems: "center" },
  mr10: {
    marginLeft: 15,
    marginBottom: 10
  },
  mrSearch: {
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
    paddingLeft: 15,
    paddingRight: 20,
    marginBottom: 10,
    width: "83%"
  },
  searchTo: { width: "100%" },
  amount: { fontSize: 20, fontWeight: "bold" },
  search: {
    width: 20,
    height: 24,
    resizeMode: "contain"
  },
  down: {
    width: 12,
    height: 17,
    resizeMode: "contain"
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  file: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginTop: -10
  },
  calender: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  },
  dateContainer: {
    elevation: 5,
    shadowColor: "#ccc9c9",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10
  },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  cross: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginBottom: -15
  },
  feeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 150
  }
});

export default TransactionsFilterList;
