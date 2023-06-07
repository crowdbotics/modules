import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";

const PaymentSplitScreen = (params) => {
  const [accountBalance, setAccountBalance] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Cody Fisher",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      },
      {
        id: 2,
        name: "Johnny Watson",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      },
      {
        id: 3,
        name: "Jenny Wilson",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      },
      {
        id: 4,
        name: "Cody Fisher",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      },
      {
        id: 5,
        name: "Johnny Watson",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      },
      {
        id: 6,
        name: "Jenny Wilson",
        profileImage: require("./assets/profile.png"),
        amount: "126.90"
      }
    ]);
    setAccountBalance("761.40");
    setBankAccount("0954 4543 2112 3116");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceText}>${accountBalance}</Text>
        <Text style={styles.accountText}>Bank Account: {bankAccount}</Text>
      </View>
      <TabView tabTitles={["Owing", "Owes"]} selected={0} />
      <View style={styles.separatorBar}>
        <Text style={[styles.fnt16, styles.grey]}>List</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => <User user={item} />}
      />
    </View>
  );
};

const User = ({ user }) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{user.name}</Text>
      </View>
      <Text style={styles.amountText}>-${user.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  header: {
    padding: 20,
    height: 120,
    backgroundColor: "#F9D8D9",
    justifyContent: "space-between"
  },
  balanceText: {
    fontSize: 40
  },
  accountText: {
    fontSize: 16
  },
  separatorBar: {
    paddingHorizontal: 40,
    marginVertical: 10
  },
  fnt16: {
    fontSize: 16
  },
  bold: {
    fontWeight: "bold"
  },
  grey: {
    color: "grey"
  },
  black: {
    color: "black"
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  userInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  profileImage: {
    borderRadius: 50,
    width: 70,
    height: 70,
    resizeMode: "contain"
  },
  username: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  amountText: {
    fontSize: 17,
    color: "#EA4335",
    fontWeight: "bold"
  }
});
export default PaymentSplitScreen;

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "60%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});
