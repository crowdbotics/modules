import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  Pressable,
  ScrollView
} from "react-native";

const Staking = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [tokenValue, setTokenValue] = useState(110);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.flexRow}>
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenHeading}>Current Token</Text>
            <Text style={styles.tokenValue}>{format(1256, "ETH", 2)}</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.tokenHeading}>Remaining</Text>
            <Text style={styles.remainingBalance}>
              Balance: {format(256, "ETH", 0)}
            </Text>
          </View>
        </View>
        <InputToken
          value={tokenValue}
          onChange={setTokenValue}
          step={1}
          style={styles.inputContainer}
        />
        <Text style={styles.heading}>Requirements for staking</Text>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Pellentesque etiam duis.</Text>
          </View>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes,
            morbi id pulvinar faucibus laoreet praesent nisi.
          </Text>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Pellentesque etiam duis.</Text>
            <Switch
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
              trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
              thumbColor={isEnabled ? "#000" : "#000"}
              style={styles.switch}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.itemHeading}>Imperdiet lorem.</Text>
            <Image
              source={require("./assets/infoIcon.png")}
              style={styles.infoIcon}
            />
          </View>
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
          <BulletText
            text="Lorem ipsum dolor sit amet, consectetur. "
            textStyle={styles.bulletText}
          />
        </View>
        <Button buttonText="Stake" style={styles.button} />
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
    marginBottom: 10
  },
  tokenContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  balanceContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "flex-end"
  },
  tokenHeading: {
    fontSize: 16,
    color: "#000"
  },
  tokenValue: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold"
  },
  itemContainer: {
    padding: 20,
    backgroundColor: "#F1F1F1",
    marginBottom: 10
  },
  remainingBalance: {
    fontSize: 14,
    color: "#12D790"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  infoIcon: {
    width: 20,
    height: 20
  },
  itemHeading: {
    fontSize: 14,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 12,
    color: "#7c7c7c"
  },
  bulletText: {
    fontSize: 12,
    color: "#7C7C7C"
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  },
  description: {
    fontSize: 14,
    marginVertical: 10
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 40
  },
  inputContainer: {
    paddingHorizontal: 20
  }
});

export default Staking;

const BulletText = props => {
  let bulletStyle = null;
  switch (props.type) {
    default:
      bulletStyle = {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: "#000",
        marginRight: 10
      };
      break;
  }
  return (
    <View style={bulletTextStyles.bulletContainer}>
      <View style={bulletStyle} />
      <Text style={[bulletTextStyles.bulletText, props.textStyle]}>
        {props.text}
      </Text>
    </View>
  );
};
const bulletTextStyles = StyleSheet.create({
  bulletContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginVertical: 2
  },
  bulletText: {
    fontSize: 12
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

const InputToken = props => {
  const step = props.step;
  const decrement = value => {
    return (value -= step);
  };
  const increment = value => {
    return (value += step);
  };
  return (
    <View style={[inputTokenStyles.container, props.style]}>
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
      case "ETH":
        return parts.join(".") + " ETH";
      default:
        return parts.join(".");
    }
  }
};
