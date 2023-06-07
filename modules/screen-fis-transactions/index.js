import React from "react";
import { Text, StyleSheet, ScrollView, Image, View, TextInput } from "react-native";

const FisTransactionScreen = (params) => {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={require("./assets/fis-logo.png")} />
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Search</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Enter' />
          </View>
          <Image source={require("./assets/search.png")} style={styles.mr10} />
        </View>
      </View>
      <Text style={styles.headText}>Transactions</Text>
      <TabView />
      <View style={styles.todaysContainer}>
        <Text style={styles.todayText}>Today</Text>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Sports Center</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Salary</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Sports Center</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
      </View>
      <View style={styles.todaysContainer1}>
        <Text style={styles.todayText}>APRIL 01</Text>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Sports Center</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer2}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Salary</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer2}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
        <View style={styles.walletInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text>Sports Center</Text>
              <Text style={styles.t12}>12:30 pm</Text>
            </View>
          </View>
          <View style={styles.mainBalanceContainer}>
            <Text style={styles.balanceContainer2}>842,11 BTC</Text>
            <Image source={require("./assets/angle-right.png")} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: { justifyContent: "center", alignItems: "center" },
  searchContainer: {},
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff"
  },
  mr10: {
    marginRight: 10
  },
  headText: {
    marginLeft: 10,
    marginVertical: 15
  },
  walletInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F7"
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 10
  },
  t12: {
    fontSize: 12,
    color: "#ADB1B2"
  },
  balanceContainer: {
    fontSize: 15,
    color: "#12D790",
    marginRight: 20

  },
  balanceContainer2: {
    fontSize: 15,
    color: "#000",
    marginRight: 20

  },
  todaysContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0,0,0,0.8)",
    elevation: 10
  },
  todaysContainer1: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0,0,0,0.8)",
    elevation: 10
  },
  mainBalanceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  todayText: { marginLeft: 22, marginTop: 10, color: "#7C7C7C" }
});

export default FisTransactionScreen;

export const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

export const TabView = () => {
  return (
    <View style={tabStyles.tabView}>
      <View style={[tabStyles.tabItem, tabStyles.selectedTab]}>
        <Text>All</Text>
      </View>
      <View style={tabStyles.tabItem}>
        <Text>Income</Text>
      </View>
      <View style={tabStyles.tabItem}>
        <Text>Expense</Text>
      </View>
    </View>
  );
};

const tabStyles = StyleSheet.create({
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    marginBottom: 10
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
    elevation: 10,
    marginLeft: 5
  }
});
