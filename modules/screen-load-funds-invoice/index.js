import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const LoadFundsInvoice = () => {
  // Minimum amount is being set through this variable
  const [tokenValue, setTokenValue] = useState(110);
  const [selectedTab, setSelectedTab] = useState(0);
  // Title of currencies that can be loaded are defined in this array
  const tabTitles = ["Dollar", "Bitcoin", "Euro", "Pound"];
  return (
    <View style={styles.container}>

      <View style={styles.headerView}>
        <Image source={require("./assets/back.png")} style={styles.backIcon}/>
        <View style={styles.subHeaderView}>
          <Text style={styles.headerTitle}>Load funds</Text>
        </View>
      </View>
      <Text style={styles.heading}>Enter your amount</Text>
      <Text style={styles.subHeading}>Choose currency</Text>

      <TabView
        tabTitles={tabTitles}
        selected={selectedTab}
        icons={[
          require("./assets/dollarIcon.png"),
          require("./assets/bitcoinIcon.png"),
          require("./assets/euroIcon.png"),
          require("./assets/poundIcon.png")
        ]}
        // Pass true or false to show the currency titles with their respective icons
        hideTitles={false}
        onPress={setSelectedTab}
        style={styles.tabView}
      />

      <InputToken
        value={tokenValue}
        onChange={setTokenValue}
        step={1}
      />

      <View style={[styles.itemContainer, { height: 60 }]}>
        <Text style={styles.infoText}>Info</Text>
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
      <Button buttonText="Load Up" style={styles.button} hideShadow={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  headerView: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 70
  },
  headerTitle: {
    fontSize: 16,
    color: "#000"
  },
  subHeaderView: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  backIcon: {
    width: 11.5,
    height: 20
  },
  infoText: {
    color: "#1E2022",
    fontWeight: "500"
  },
  heading: {
    fontSize: 24,
    color: "#000"
  },
  subHeading: {
    fontSize: 14,
    color: "#999",
    marginBottom: 15
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
    color: "#313633"
  },
  subText: {
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 13
  },
  totalText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#000"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50
  }
});

export default LoadFundsInvoice;

const InputToken = (props) => {
  const {
    step,
    onChange,
    value
  } = props;
  // This function is used to reduce the amount to be loaded
  const decrement = (value) => {
    return (value -= step);
  };
  // This function is used to increase the amount to be loaded
  const increment = (value) => {
    return (value += step);
  };
  return (
    <View style={inputTokenStyles.container}>
      <View style={inputTokenStyles.tokenValueContainer}>
        <Pressable onPress={() => onChange(decrement(value))}>
          <Image
            source={require("./assets/decrementIcon.png")}
            style={inputTokenStyles.icon}
          />
        </Pressable>
        <Text style={inputTokenStyles.fnt18}>{value.toFixed(2)}</Text>
        <Pressable onPress={() => onChange(increment(value))}>
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
const TabView = (props) => {
  const {
    tabTitles,
    selected,
    onPress,
    tabColor,
    backgroundColor,
    style,
    icons,
    hideTitles
  } = props;
  // This variable applies the background color(passed through props) to the tab.
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  // This variable applies the background color(passed through props) to the tab container.
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  // This variable is used to map currencies if either one of them has some data in it
  const generator = icons || tabTitles;
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
      {generator.map((item, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
           [tabColorStyle, tabViewStyles.tabItem]
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
    marginVertical: 10,
    marginBottom: 25
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    shadowColor: "#000",
    elevation: 10
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
  const {
    color,
    textColor,
    outlineColor,
    style,
    onPress,
    buttonText,
    children
  } = params;
   // This variable changes the background color of the pressable button.
  const backgroundColor = color || "#000";
  // This variable changes the text color of the pressable button.
  const buttonTextColor = textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: buttonTextColor
  };
  return (
    <View style={[buttonStyles.btnContainer, style]}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={onPress}
        >
          <Text style={[buttonStyles.btnText, btnText]}>
            {buttonText}
          </Text>
          <View style={styles.childrenContainer}>{children}</View>
        </Pressable>
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
    borderRadius: 10,
    marginHorizontal: 25
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 35,
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
