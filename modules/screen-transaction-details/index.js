import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const TransactionDetails = () => {
  const [user, setUser] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setUser({
      name: "Username",
      email: "username@email.com",
      image: require("./assets/userImage.png")
    });
    setTransaction({
      name: "User name",
      amount: 1285,
      transactionID: "0xdC4592CFBa591e4E243fA35e2e4eEeBd4e4eEeBd",
      date: "2021-01-01",
      currency: "USD",
      time: "16:00:00"
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={user.image} style={styles.image} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <Text style={styles.itemHeading}>Transaction Details</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.subText}>Sender/ Reciever</Text>
            <Text style={styles.mainText}>{transaction.name}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.subText}>Sender/ Reciever</Text>
            <Text style={styles.mainText}>
              {format(transaction.amount, transaction.currency, 2)}
            </Text>
          </View>
        </View>
        <Text style={styles.itemHeading}>Transaction ID</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.subText} numberOfLines={1}>
              {transaction.transactionID}
            </Text>
            <Checkbox
              value={checked}
              setValue={setChecked}
              style={styles.checkbox}
            />
          </View>
        </View>
        <Text style={styles.itemHeading}>Date</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.subText} numberOfLines={1}>
              {transaction.date}
            </Text>
          </View>
        </View>
        <Text style={styles.itemHeading}>Time</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.subText} numberOfLines={1}>
              {transaction.time}
            </Text>
          </View>
        </View>
        <Button buttonText="Close" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  email: {
    fontSize: 14,
    color: "#666"
  },
  itemHeading: {
    fontSize: 14,
    color: "#7C7C7C",
    marginLeft: 20,
    textTransform: "uppercase"
  },
  itemContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    padding: 10
  },
  subText: {
    fontSize: 16,
    color: "#231F20",
    width: "80%"
  },
  mainText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold"
  },
  checkbox: {
    marginRight: 10
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 20
  }
});

export default TransactionDetails;

const format = (value, currency, precesion) => {
  const parts = value && value.toFixed(precesion).toString().split(".");
  if (parts) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    switch (currency) {
      case "USD":
        return "$ " + parts.join(".");
      case "BTC":
        return parts.join(".") + " BTC";
      case "EUR":
        return "€ " + parts.join(".");
      case "GBP":
        return "£ " + parts.join(".");
      case "ETH":
        return parts.join(".") + " ETH";
      default:
        return parts.join(".");
    }
  }
};

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
