import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";

const SelectBankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  useEffect(() => {
    setAccounts([
      {
        name: "Account 1",
        accountNumber: "123456789",
        balance: 1000
      },
      {
        name: "Account 2",
        accountNumber: "651234567",
        balance: 1000
      },
      {
        name: "Account 3",
        accountNumber: "945612345",
        balance: 1000
      }
    ]);
  }, []);
  const handleAccountSelection = account => {
    let newSelectedAccounts = [...selectedAccounts];
    if (newSelectedAccounts.includes(account)) {
      newSelectedAccounts = newSelectedAccounts.filter(
        acc => acc.accountNumber !== account.accountNumber
      );
    } else {
      newSelectedAccounts.push(account);
    }
    setSelectedAccounts(newSelectedAccounts);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Accounts</Text>
      <Text style={styles.subHeading}>Accounts to be shared</Text>
      <View style={styles.accountsContainer}>
        {accounts.map((account, index) => (
          <Pressable
            key={index}
            style={[
              styles.accountItem,
              selectedAccounts.includes(account) && styles.selectedAccount
            ]}
            onPress={() => handleAccountSelection(account)}>
            <View style={styles.accountDetails}>
              <Text
                style={[
                  styles.accountName,
                  selectedAccounts.includes(account) && styles.whiteText
                ]}>
                {account.name}
              </Text>
              <Text
                style={[
                  styles.accountNumber,
                  selectedAccounts.includes(account) && styles.whiteText
                ]}>
                {account.accountNumber}
              </Text>
              <Text
                style={[
                  styles.accountBalance,
                  selectedAccounts.includes(account) && styles.whiteText
                ]}>
                Balance: {format(account.balance, "USD", 2)}
              </Text>
            </View>
            <Checkbox
              value={selectedAccounts.includes(account)}
              setValue={() => handleAccountSelection(account)}
              color="#000"
              activeColor="#fff"
            />
          </Pressable>
        ))}
      </View>
      <Text style={styles.subText}>Need help?</Text>
      <Button buttonText="Link bank account" style={styles.button} hideShadow />
      <Button
        buttonText="Cancel"
        backgroundColor="#fff"
        textColor="#000"
        borderColor="#000"
        style={styles.button}
        hideShadow
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginBottom: 40
  },
  subHeading: {
    fontSize: 16,
    color: "#7C7C7C",
    textTransform: "uppercase",
    marginLeft: 20,
    marginBottom: 10
  },
  accountsContainer: {
    padding: 20,
    backgroundColor: "#F1F1F1"
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5
  },
  selectedAccount: {
    backgroundColor: "#000"
  },
  accountDetails: {
    flex: 1
  },
  accountName: {
    fontSize: 16,
    color: "#000"
  },
  accountNumber: {
    fontSize: 14,
    color: "#000"
  },
  accountBalance: {
    fontSize: 14,
    color: "#12D790"
  },
  whiteText: {
    color: "#fff"
  },
  subText: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    marginHorizontal: 40,
    marginTop: 20
  }
});

export default SelectBankAccounts;

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}>
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[
          checkboxStyles.checkbox,
          props.color && { tintColor: props.color },
          props.activeColor && props.value && { tintColor: props.activeColor }
        ]}
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
    width: "100%",
    tintColor: "#000"
  }
});

const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
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
          onPress={params.onPress}>
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
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
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

const format = (value, currency, precesion) => {
  const parts = value && value.toFixed(precesion).toString().split(".");
  if (parts) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    switch (currency) {
      case "USD":
        return "$ " + parts.join(".");
      case "ETH":
        return parts.join(".") + " ETH";
      default:
        return parts.join(".");
    }
  }
};
