import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image
} from "react-native";

const StripeConnectedAccounts = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [expanded, setExpanded] = useState([]);
  useEffect(() => {
    setAccounts([
      {
        email: "Username@email.com",
        status: "Completed",
        balance: 0,
        volume: 0,
        type: "Express",
        date: "07 June"
      },
      {
        email: "Username@email.com",
        status: "Completed",
        balance: 0,
        volume: 0,
        type: "Express",
        date: "07 June"
      },
      {
        email: "Username@email.com",
        status: "Completed",
        balance: 0,
        volume: 0,
        type: "Express",
        date: "07 June"
      },
      {
        email: "Username@email.com",
        status: "Completed",
        balance: 0,
        volume: 0,
        type: "Express",
        date: "07 June"
      },
      {
        email: "Username@email.com",
        status: "Completed",
        balance: 0,
        volume: 0,
        type: "Express",
        date: "07 June"
      }
    ]);
  }, []);
  const handleExpand = item => {
    if (expanded.includes(item)) {
      setExpanded(expanded.filter(i => i !== item));
    } else {
      setExpanded([...expanded, item]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TabView
              tabTitles={[
                "All Accounts",
                "Restricted",
                "Restricted Soon",
                "Personal"
              ]}
              selected={selectedTab}
              onPress={setSelectedTab}
              style={styles.tabViewScroll}
            />
          </ScrollView>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Accounts</Text>
          <Image
            source={require("./assets/settingsIcon.png")}
            style={styles.icon}
          />
        </View>
        <TabView
          tabTitles={["Filter", "Create", "Export"]}
          selected={selectedTab1}
          onPress={setSelectedTab1}
          style={styles.tabView}
          icons={[
            require("./assets/filterIcon.png"),
            require("./assets/addIcon.png"),
            require("./assets/uploadIcon.png")
          ]}
        />
        {accounts.map((account, index) => (
          <View key={index} style={styles.accountContainer}>
            <Pressable
              style={styles.accountHeader}
              onPress={() => handleExpand(account)}>
              <Text>{account.email}</Text>
              <Image
                style={styles.icon}
                source={
                  expanded.includes(account)
                    ? require("./assets/dropdownIconExpanded.png")
                    : require("./assets/dropdownIconCollapsed.png")
                }
              />
            </Pressable>
            {expanded.includes(account) && (
              <View style={styles.accountBody}>
                <View style={styles.flexRow}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/settingsIcon.png")}
                  />
                  <Text style={styles.mainText}>Status</Text>
                  <View style={styles.pill}>
                    <Text style={styles.pillText}>{account.status}</Text>
                  </View>
                </View>
                <View style={styles.flexRow}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/downArrowIcon.png")}
                  />
                  <Text style={styles.mainText}>Balance</Text>
                  <Text style={styles.subText}>
                    {format(account.balance, "USD")}
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/downArrowIcon.png")}
                  />
                  <Text style={styles.mainText}>Volume</Text>
                  <Text style={styles.subText}>
                    {format(account.volume, "USD")}
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/settingsIcon.png")}
                  />
                  <Text style={styles.mainText}>Type</Text>
                  <Text style={styles.subText}>{account.type}</Text>
                </View>
                <View style={styles.flexRow}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/downArrowIcon.png")}
                  />
                  <Text style={styles.mainText}>Connected</Text>
                  <Text style={styles.subText}>{account.date}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 16
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  icon: {
    width: 20,
    height: 20
  },
  tabViewScroll: {
    marginHorizontal: 10
  },
  tabView: {
    marginHorizontal: 10,
    width: "80%"
  },
  accountContainer: {
    marginHorizontal: 20
  },
  accountHeader: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingHorizontal: 10
  },
  mainText: {
    flex: 1,
    marginLeft: 10
  },
  subText: {
    fontSize: 12,
    color: "#7C7C7C"
  },
  pill: {
    width: 70,
    height: 30,
    backgroundColor: "#12D790",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  pillText: {
    fontSize: 10,
    color: "#fff"
  }
});

export default StripeConnectedAccounts;

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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
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
          key={index}>
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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flex: 1
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    marginRight: 10
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
