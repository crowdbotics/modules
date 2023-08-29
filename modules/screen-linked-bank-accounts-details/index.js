import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";

const LinkedBankAccountsDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedBankAccounts, setSelectedBankAccounts] = useState([]);
  useEffect(() => {
    setBankAccounts([
      {
        name: "Account name",
        balance: "$12,215.25"
      },
      {
        name: "Account name",
        balance: "$12,215.25"
      },
      {
        name: "Account name",
        balance: "$12,215.25"
      },
      {
        name: "Account name",
        balance: "$12,215.25"
      }
    ]);
  }, []);
  const handleSelect = (item) => {
    if (selectedBankAccounts.includes(item)) {
      setSelectedBankAccounts(selectedBankAccounts.filter((i) => i !== item));
    } else {
      setSelectedBankAccounts([...selectedBankAccounts, item]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account Details</Text>
      <Text style={styles.subHeading}>Choose</Text>
      <TabView
        tabTitles={["Personal", "Investment"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
      />
      <Text style={styles.listText}>List of all accounts</Text>
      {bankAccounts.map((account, index) => (
        <View key={index}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{account.name}</Text>
            <Checkbox
              value={selectedBankAccounts.includes(account)}
              setValue={() => handleSelect(account)}
            />
          </View>
          <View style={styles.balanceContainer}>
            <Text>Amount</Text>
            <Text style={styles.balance}>{account.balance}</Text>
          </View>
        </View>
      ))}
      <Button buttonText="Select Account" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 20,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#999999"
  },
  tabView: {
    width: "70%"
  },
  listText: {
    marginVertical: 20
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  balance: {
    fontSize: 14,
    color: "#12D790"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});

export default LinkedBankAccountsDetails;

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

const Checkbox = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}
    >
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[checkboxStyles.checkbox]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  container: {
    height: 20,
    width: 20
  },
  checkbox: {
    height: "100%",
    width: "100%"
  }
});

const Button = (params) => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}
        >
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
