import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList
} from "react-native";

const StripeAccountActivity = () => {
  const [user, setUser] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setUser({
      image: require("./assets/userImage.png"),
      balance: 45552.68
    });
    setHistory([
      {
        date: "Today",
        list: [
          {
            type: "Debit",
            time: "11:30 AM",
            title: "Sold BTC for Bit",
            amount: 1.8,
            remainingBalance: 2112,
            currency: "BTC"
          },
          {
            type: "Debit",
            time: "11:30 AM",
            title: "Sold BTC for Bit",
            amount: 1.8,
            remainingBalance: 2112,
            currency: "BTC"
          },
          {
            type: "Credit",
            time: "11:30 AM",
            title: "From Cody Fisher",
            amount: 141,
            remainingBalance: 2112,
            currency: "USD"
          }
        ]
      },
      {
        date: "Yesterday",
        list: [
          {
            type: "Debit",
            time: "11:30 AM",
            title: "Sold BTC for Bit",
            amount: 1.8,
            remainingBalance: 2112,
            currency: "BTC"
          },
          {
            type: "Debit",
            time: "11:30 AM",
            title: "Sold BTC for Bit",
            amount: 1.8,
            remainingBalance: 2112,
            currency: "BTC"
          },
          {
            type: "Credit",
            time: "11:30 AM",
            title: "From Cody Fisher",
            amount: 141,
            remainingBalance: 2112,
            currency: "USD"
          }
        ]
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.image} style={styles.userImage} />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>{format(user.balance)}</Text>
          <Text style={styles.subText}>Balance</Text>
        </View>
      </View>
      <Text style={styles.heading}>Transactions</Text>
      <TabView
        tabTitles={["All", "All Payouts"]}
        onPress={setSelectedTab}
        selected={selectedTab}
        style={styles.tabView}
      />
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={styles.historyTab}>
            <Text style={styles.heading}>{item.date}</Text>
            {item.list.map((historyItem, index) => (
              <View style={styles.historyItem} key={index}>
                <Image
                  source={
                    historyItem.type === "Debit"
                      ? require("./assets/debitIcon.png")
                      : require("./assets/creditIcon.png")
                  }
                  style={styles.historyIcon}
                />
                <View style={styles.detailView}>
                  <Text style={styles.heading}>{historyItem.title}</Text>
                  <Text style={styles.subText}>{historyItem.time}</Text>
                </View>
                <View style={styles.balanceView}>
                  <Text
                    style={[
                      styles.subText,
                      historyItem.type === "Debit"
                        ? styles.debit
                        : styles.credit
                    ]}
                  >
                    {historyItem.type === "Debit" ? "-" : "+"}
                    {format(historyItem.amount, "BTC")}
                  </Text>
                  <Text style={styles.historyBalance}>
                    {format(historyItem.remainingBalance, "BTC")}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 25
  },
  balanceContainer: {
    alignItems: "flex-end"
  },
  balanceText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  subText: {
    color: "#7C7C7C"
  },
  heading: {
    fontSize: 16,
    color: "#1E2022"
  },
  tabView: {
    width: 250
  },
  historyTab: {
    paddingVertical: 20
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  historyIcon: {
    width: 50,
    height: 50
  },
  detailView: {
    flex: 1,
    justifyContent: "space-between",
    height: 40
  },
  balanceView: {
    flex: 1,
    justifyContent: "space-between",
    height: 40,
    alignItems: "flex-end"
  },
  debit: {
    color: "#EF5060"
  },
  credit: {
    color: "#12D790"
  },
  historyBalance: {
    fontSize: 18
  }
});

export default StripeAccountActivity;

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]
              : [
                  tabViewStyles.unSelected,
                  backgroundColorStyle,
                  tabViewStyles.tabItem
                ]
          }
          key={index}
        >
          {icons
            ? (
            <Image
              source={icons[index]}
              style={[
                tabViewStyles.icon,
                index === selected
                  ? tabViewStyles.selectedIcon
                  : tabViewStyles.unSelectedIcon
              ]}
            />
              )
            : null}
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5
  },
  selectedIcon: {
    tintColor: "#000"
  },
  unSelectedIcon: {
    tintColor: "#7C7C7C"
  }
});

const format = (num, currency) => {
  let str =
    num &&
    num
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  switch (currency) {
    case "BTC":
      str += " BTC";
      break;
    case "ETH":
      str += " ETH";
      break;
    case "USD":
      str = "$" + str;
      break;
    default:
      str = "$" + str;
      break;
  }
  return str;
};
