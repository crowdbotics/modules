import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Image, Switch } from "react-native";

const LoadWallet = () => {
  const [tokenValue, setTokenValue] = useState(110);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    setCurrencies([
      {
        name: "Euro",
        key: "EUR"
      },
      {
        name: "Dollar",
        key: "USD"
      },
      {
        name: "Pound",
        key: "GBP"
      },
      {
        name: "Bitcoin",
        key: "BTC"
      }
    ]);
  }, []);
  const icons = [
    {
      key: "EUR",
      name: "Euro",
      icon: require("./assets/euroIcon.png")
    },
    {
      key: "USD",
      name: "Dollar",
      icon: require("./assets/dollarIcon.png")
    },
    {
      key: "GBP",
      name: "Pound",
      icon: require("./assets/poundIcon.png")
    },
    {
      key: "BTC",
      name: "Bitcoin",
      icon: require("./assets/bitcoinIcon.png")
    }
  ];
  const getIcon = name => {
    const find = icons.find(icon => icon.key === name);
    if (find) {
      return find.icon;
    }
  };
  const handleCurrencyChange = currency => {
    if (selectedCurrency === currency) {
      setSelectedCurrency();
    } else {
      setSelectedCurrency(currency);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Enter your amount</Text>
        <Text style={styles.subHeading}>Choose Currency</Text>
      </View>
      <View style={styles.currencyContainer}>
        {currencies.map((currency, index) => (
          <View key={index} style={styles.flexRow}>
            <Image
              source={getIcon(currency.key)}
              style={[
                styles.currencyIcon,
                selectedCurrency === currency && styles.selectedCurrencyIcon
              ]}
            />
            <Text style={styles.currencyText}>{currency.name}</Text>
            <Switch
              value={selectedCurrency === currency}
              onValueChange={() => handleCurrencyChange(currency)}
              trackColor={{ false: "#767577", true: "#e5e5e5" }}
              thumbColor={selectedCurrency === currency ? "#12D790" : "#000"}
              style={styles.switch}
            />
          </View>
        ))}
      </View>
      <View style={styles.invoiceContainer}>
        <InputToken
          value={tokenValue}
          onChange={x => setTokenValue(x)}
          step={1}
        />
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.mainText}>Fee</Text>
            <Text style={styles.subText}>Amount</Text>
          </View>
          <Text style={styles.feeText}>
            {format(3, selectedCurrency ? selectedCurrency.key : "USD", 2)}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.mainText}>Total</Text>
            <Text style={styles.subText}>Amount</Text>
          </View>
          <Text style={styles.totalText}>
            {format(
              tokenValue + 3,
              selectedCurrency ? selectedCurrency.key : "USD",
              2
            )}
          </Text>
        </View>
        <Button buttonText="Load Up" style={styles.button} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  button: {
    marginTop: 40,
    marginHorizontal: 20
  },
  currencyContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1
  },
  currencyIcon: {
    width: 30,
    height: 30,
    tintColor: "#aaa"
  },
  selectedCurrencyIcon: {
    tintColor: "#12D790"
  },
  currencyText: {
    fontSize: 16,
    color: "#231F20",
    flex: 1,
    marginLeft: 10
  },
  invoiceContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
    paddingTop: 20
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  heading: {
    fontSize: 24,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 10,
    textTransform: "uppercase"
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  }
});

export default LoadWallet;

const InputToken = props => {
  const step = props.step;
  const decrement = value => {
    return (value -= step);
  };
  const increment = value => {
    return (value += step);
  };
  return (
    <View style={inputTokenStyles.container}>
      <Text style={inputTokenStyles.heading}>Enter amount</Text>
      <View style={inputTokenStyles.tokenValueContainer}>
        <Pressable onPress={() => props.onChange(decrement(props.value))}>
          <Image
            source={require("./assets/decrementIcon.png")}
            style={inputTokenStyles.icon}
          />
        </Pressable>
        <Text style={inputTokenStyles.fnt18}>{props.value.toFixed(2)}</Text>
        <Pressable onPress={() => props.onChange(increment(props.value))}>
          <Image
            source={require("./assets/incrementIcon.png")}
            style={inputTokenStyles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};
const inputTokenStyles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  heading: {
    fontSize: 14,
    marginLeft: 10
  },
  tokenValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    marginVertical: 10
  },
  fnt18: {
    fontSize: 18
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
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

const format = (value, currency, precision) => {
  const parts = value && value.toFixed(precision).toString().split(".");
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
