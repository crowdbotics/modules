import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from "react-native";

const LedgerListingScreen = (params) => {
  const [todayHistory, setTodayHistory] = useState([]);
  const [aprilHistory, setAprilHistory] = useState([]);
  useEffect(() => {
    setTodayHistory([
      {
        id: 1,
        title: "Sports Center",
        price: "$125.90",
        type: "debit"
      },
      {
        id: 2,
        title: "Shopping",
        price: "$552.68",
        type: "credit"
      },
      {
        id: 3,
        title: "Income",
        price: "$345.00",
        type: "credit"
      }
    ]);
    setAprilHistory([
      {
        id: 1,
        title: "Sports Center",
        price: "$125.90",
        type: "debit"
      },
      {
        id: 2,
        title: "Shopping",
        price: "$552.68",
        type: "credit"
      },
      {
        id: 3,
        title: "Income",
        price: "$345.00",
        type: "credit"
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text>Current Balance</Text>
          <Text style={styles.currentBalance}>$35,559.00</Text>
          <Text>Bank Account: 0954 4543 2112 3116</Text>
        </View>
        <View>
          <Image
            resizeMode="contain"
            style={styles.withdrawImage}
            source={require("./assets/withdraw.png")}
          />
        </View>
      </View>
      <TabView
        tabTitles={["Transactions", "Report", "Transfer"]}
        selected={0}
      />
      <ScrollView>
        <View style={styles.historyList}>
          <Text style={styles.historyDate}>TODAY&apos;</Text>
          <FlatList
            data={todayHistory}
            renderItem={({ item }) => <HistoryItem transaction={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
        <View style={styles.historyList}>
          <Text style={styles.historyDate}>April 01</Text>
          <FlatList
            scrollEnabled={false}
            data={aprilHistory}
            renderItem={({ item }) => <HistoryItem transaction={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginVertical: 20,
    backgroundColor: "#e6e6e6",
    paddingBottom: 10
  },
  currentBalance: {
    fontSize: 36,
    marginVertical: 5
  },
  withdrawImage: {
    width: 52,
    height: 73
  },
  paletteContainer: {
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
  },
  historyDate: {
    fontSize: 16,
    marginVertical: 10,
    color: "#9B9B9B",
    marginLeft: 20
  },
  historyList: {
    marginVertical: 10,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "gray",
    elevation: 10,
    backgroundColor: "#fff"
  }
});
export default LedgerListingScreen;

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

const HistoryItem = ({ transaction }) => {
  const pricingTextColor = {
    color: transaction.type === "debit" ? "#EA4335" : "#05B417"
  };
  return (
    <View style={historyItemStyles.historyItem}>
      <View style={historyItemStyles.description}>
        <Text style={historyItemStyles.titleText}>{transaction.title}</Text>
        <Text
          style={{
            color: "grey"
          }}
        >
          Invoice
        </Text>
      </View>
      <View style={historyItemStyles.pricing}>
        {transaction.type === "debit"
          ? (
          <Text style={[historyItemStyles.pricingText, pricingTextColor]}>
            -{" "}
          </Text>
            )
          : (
          <Text style={[historyItemStyles.pricingText, pricingTextColor]}>
            +{" "}
          </Text>
            )}
        <Text style={[historyItemStyles.pricingText, pricingTextColor]}>
          {transaction.price}
        </Text>
        <Image
          source={require("./assets/arrow.png")}
          style={historyItemStyles.arrowIcon}
        />
      </View>
    </View>
  );
};

const historyItemStyles = StyleSheet.create({
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    height: 80
  },
  description: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 16,
    color: "#111112"
  },
  pricing: {
    marginRight: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pricingText: {
    fontSize: 16,
    color: "#111112",
    fontWeight: "bold"
  },
  arrowIcon: {
    marginLeft: 10,
    width: 15,
    height: 15,
    resizeMode: "contain"
  }
});
