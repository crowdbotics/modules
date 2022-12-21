import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView
} from "react-native";

const LoadFunds = () => {
  const [tokenValue, setTokenValue] = useState(110);
  const [funds, setFunds] = useState([]);
  useEffect(() => {
    setFunds([
      {
        name: "Dollar",
        key: "USD",
        value: "1256"
      },
      {
        name: "Bitcoin",
        key: "BTC",
        value: "0.1256"
      },
      {
        name: "Euro",
        key: "EUR",
        value: "0.1256"
      },
      {
        name: "Pound",
        key: "GBP",
        value: "0.1256"
      }
    ]);
  }, []);
  const icons = [
    {
      key: "USD",
      source: require("./assets/dollarIcon.png")
    },
    {
      key: "BTC",
      source: require("./assets/bitcoinIcon.png")
    },
    {
      key: "EUR",
      source: require("./assets/euroIcon.png")
    },
    {
      key: "GBP",
      source: require("./assets/poundIcon.png")
    }
  ];
  const getIcon = (key) => {
    const image = icons.find((x) => x.key === key).source;
    if (image) {
      return image;
    } else {
      return null;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.heading}>Enter your amount</Text>
          <Text style={styles.subHeading}>Specify the amount</Text>
          <InputToken
            value={tokenValue}
            onChange={(x) => setTokenValue(x)}
            step={1}
          />
        </View>
        <View style={styles.body}>
          {funds.map((fund, index) => (
            <View style={styles.fundContainer} key={index}>
              <Image source={getIcon(fund.key)} style={styles.icon} />
              <View style={styles.nameContainer}>
                <Text>{fund.name}</Text>
                <Text style={styles.subText}>{fund.key}</Text>
              </View>
              <Text style={styles.mainText}>{fund.value}</Text>
            </View>
          ))}
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
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 28,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#999"
  },
  body: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 20
  },
  fundContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 70
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  nameContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "space-around",
    height: "80%"
  },
  subText: {
    fontSize: 12,
    color: "#999"
  },
  mainText: {
    fontSize: 18,
    color: "#000"
  }
});

export default LoadFunds;

const InputToken = (props) => {
  const step = props.step;
  const decrement = (value) => {
    return (value -= step);
  };
  const increment = (value) => {
    return (value += step);
  };
  return (
    <View style={inputTokenStyles.container}>
      <View style={inputTokenStyles.tokenValueContainer}>
        <Pressable onPress={() => props.onChange(decrement(props.value))}>
          <Image source={require("./assets/decrementIcon.png")} />
        </Pressable>
        <Text style={inputTokenStyles.fnt18}>{props.value.toFixed(2)}</Text>
        <Pressable onPress={() => props.onChange(increment(props.value))}>
          <Image source={require("./assets/incrementIcon.png")} />
        </Pressable>
      </View>
    </View>
  );
};
const inputTokenStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20
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
  }
});
