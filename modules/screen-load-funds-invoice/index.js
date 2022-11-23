import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const LoadFundsInvoice = () => {
  const [tokenValue, setTokenValue] = useState(110);
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter your amount</Text>
      <Text style={styles.subHeading}>Specify the amount</Text>

      <TabView
        tabTitles={["Dollar", "Bitcoin", "Euro", "Pound"]}
        selected={selectedTab}
        icons={[
          require("./assets/dollarIcon.png"),
          require("./assets/bitcoinIcon.png"),
          require("./assets/euroIcon.png"),
          require("./assets/poundIcon.png")
        ]}
        hideTitles={true}
        onPress={(index) => setSelectedTab(index)}
        style={styles.tabView}
      />

      <InputToken
        value={tokenValue}
        onChange={(x) => setTokenValue(x)}
        step={1}
      />

      <View style={styles.itemContainer}>
        <Text>Info</Text>
      </View>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.mainText}>Fee</Text>
          <Text style={styles.subText}>Amount</Text>
        </View>
        <Text style={styles.feeText}>$3.00</Text>
      </View>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.mainText}>Total</Text>
          <Text style={styles.subText}>Amount</Text>
        </View>
        <Text style={styles.totalText}>${(tokenValue + 3).toFixed(2)}</Text>
      </View>
      <Button buttonText="Load Up" style={styles.button} />
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
    fontSize: 28,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#999"
  },
  tabView: {
    marginTop: 20
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
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30
  }
});

export default LoadFundsInvoice;

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
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  }
});

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons,
  hideTitles
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  const generator = icons || tabTitles;
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
      {generator.map((item, index) => (
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
          {!hideTitles && <Text>{tabTitles[index]}</Text>}
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
