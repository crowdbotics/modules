import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const BondConfirmation = () => {
  const [requirements, setRequirements] = useState("");
  const [tokenValue, setTokenValue] = useState(0);
  useEffect(() => {
    setRequirements(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus sem justo, leo quam posuere platea rhoncus aenean massa. Semper ullamcorper in sed sollicitudin suspendisse."
    );
    setTokenValue(2.75);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subText}>Current Token</Text>
          <Text style={styles.mainText}>1256 ETH</Text>
        </View>
        <Image source={require("./assets/cryptoIcon.png")} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require("./assets/image.png")} style={styles.image} />
      </View>
      <Text style={styles.heading}>Staking requirements</Text>
      <Text style={styles.requirementsText}>{requirements}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.flexRow}>
          <Text style={[styles.fnt16, styles.bold]}>Receiving amount</Text>
          <Text style={styles.fnt18}>{tokenValue.toFixed(2)} ETH</Text>
        </View>
        <View style={styles.flexRow}>
          <Text>Cost of bond</Text>
          <Text style={styles.fnt12}>2.803.23$</Text>
        </View>
      </View>
      <InputToken
        value={tokenValue}
        onChange={(x) => setTokenValue(x)}
        step={0.1}
      />
      <Button buttonText={"Confirm"} />
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
    alignItems: "center"
  },
  subText: {
    fontSize: 16
  },
  mainText: {
    fontSize: 36
  },
  imageContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    width: 340,
    height: 170,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10
  },
  requirementsText: {
    textAlign: "justify"
  },
  detailsContainer: {
    borderColor: "#e0e0e0",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 10,
    height: 80,
    marginVertical: 10,
    justifyContent: "space-around"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fnt16: {
    fontSize: 16
  },
  bold: {
    fontWeight: "bold"
  },
  fnt18: {
    fontSize: 18
  },
  fnt12: {
    fontSize: 12
  }
});

export default BondConfirmation;

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
      <Text>Input Token</Text>
      <View style={inputTokenStyles.tokenValueContainer}>
        <Pressable onPress={() => props.onChange(decrement(props.value))}>
          <Image source={require("./assets/decrementIcon.png")} />
        </Pressable>
        <Text style={inputTokenStyles.fnt18}>{props.value.toFixed(2)} ETH</Text>
        <Pressable onPress={() => props.onChange(increment(props.value))}>
          <Image source={require("./assets/incrementIcon.png")} />
        </Pressable>
      </View>
    </View>
  );
};
const inputTokenStyles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  tokenValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 60,
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
const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
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
