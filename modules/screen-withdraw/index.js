import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput
} from "react-native";

const Withdraw = () => {
  const [user, setUser] = useState({});
  const [withdrawAmount, setWithdrawAmount] = useState("00");
  useEffect(() => {
    setUser({
      image: require("./assets/userImage.png"),
      balance: 1244.84
    });
  }, []);
  const onChanged = text => {
    text = text.replace(/[^0-9.]/g, "");
    setWithdrawAmount(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.userImage} source={user.image} />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>
            {format(user.balance, "USD", 2)}
          </Text>
          <Text style={styles.balanceText}>Balance</Text>
        </View>
      </View>
      <Text style={styles.heading}>Enter Amount</Text>
      <View style={styles.cardContainer}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.withdrawText}>Withdraw</Text>
            <Text style={styles.withdrawBalance}>
              Balance: {format(user.balance, "USD", 2)}
            </Text>
          </View>
          <TextInput
            textAlign={"right"}
            style={styles.input}
            value={withdrawAmount}
            onChangeText={x => onChanged(x)}
            keyboardType="numeric"
            onFocus={() => setWithdrawAmount("")}
          />
          {/* <Text style={styles.withdrawAmount}>{format(244, "", 2)}</Text> */}
        </View>
      </View>
      <Text style={styles.subHeading}>Cash out rules</Text>
      <View style={styles.cardContainer}>
        <View style={styles.itemContainer}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam morbi
            sit urna interdum phasellus sit.
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.mainText}>Fee</Text>
            <Text style={styles.subText}>Amount</Text>
          </View>
          <Text style={styles.feeText}>{format(3, "USD", 2)}</Text>
        </View>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.mainText}>Total</Text>
            <Text style={styles.subText}>Amount</Text>
          </View>

          <Text style={styles.totalText}>
            {format(parseInt(withdrawAmount, 10) + 3, "USD", 2)}
          </Text>
        </View>
      </View>
      <Button buttonText="Confirm" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1"
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  balanceContainer: {
    alignItems: "flex-end"
  },
  balanceText: {
    fontSize: 14,
    color: "#7C7C7C"
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000"
  },
  heading: {
    fontSize: 24,
    marginLeft: 20,
    marginBottom: 20
  },
  cardContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  withdrawText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold"
  },
  withdrawBalance: {
    fontSize: 12,
    color: "#ADB1B2",
    marginTop: 5
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1
  },
  feeText: {
    fontSize: 26,
    color: "#7C7C7C"
  },
  mainText: {
    fontSize: 18,
    color: "#000"
  },
  subText: {
    fontSize: 14,
    color: "#7C7C7C"
  },
  totalText: {
    fontSize: 26,
    color: "#000"
  },
  subHeading: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    marginHorizontal: 40,
    marginTop: 50
  },
  input: {
    width: 100,
    height: "100%",
    fontSize: 22,
    color: "#ADB1B2",
    fontWeight: "bold"
  }
});

export default Withdraw;

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
      default:
        return parts.join(".");
    }
  }
};

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
