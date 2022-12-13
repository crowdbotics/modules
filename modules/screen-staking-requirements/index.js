import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const StakingRequirements = () => {
  const [stakingRequirements, setStakingRequirements] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [stakingAmount, setStakingAmount] = useState(2);
  useEffect(() => {
    setStakingRequirements({
      title: "Staking Requirements",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit urna condimentum amet nulla dignissim. Non nullam et non lacinia tincidunt sed et metus duis. Tellus nullam lacus, bibendum nisl vitae est. Et, in donec purus tristique. Commodo mattis eu.",
      remainigTokens: 825
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Staking Requirements</Text>
      <TabView
        tabTitles={[
          "Your 32 ETH",
          "Validator Keys",
          "Entrusted node operations"
        ]}
        selected={selectedTab}
        onPress={setSelectedTab}
      />
      <Text style={styles.description}>{stakingRequirements.description}</Text>
      <Text style={styles.description}>{stakingRequirements.description}</Text>
      <View style={styles.itemContainer}>
        <Text style={styles.heading}>Remaining tokens</Text>
        <Text style={styles.itemValue}>
          {stakingRequirements.remainigTokens} ETH
        </Text>
      </View>
      <Text style={styles.tokenHeading}>Input token to stake</Text>
      <InputToken value={stakingAmount} setValue={setStakingAmount} />
      <Button buttonText="Stake" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold"
  },
  description: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "justify"
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    borderTopWidth: 1,
    paddingHorizontal: 20
  },
  itemValue: {
    fontSize: 18
  },
  tokenHeading: {
    fontSize: 14,
    marginLeft: 20,
    color: "#000"
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});

export default StakingRequirements;

const Button = params => {
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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
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
          key={index}>
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
          <Text style={tabViewStyles.tabText}>{title}</Text>
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
    justifyContent: "space-between"
  },
  tabItem: {
    borderRadius: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
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
  },
  tabText: {
    fontSize: 10
  }
});

const InputToken = ({ value, setValue }) => {
  const increment = () => {
    setValue(value + 0.01);
  };
  const decrement = () => {
    if (value > 0) {
      setValue(value - 0.01);
    }
  };
  return (
    <View style={inputTokenStyles.container}>
      <Pressable onPress={() => decrement()}>
        <Image
          source={require("./assets/decrementIcon.png")}
          style={inputTokenStyles.icon}
        />
      </Pressable>
      <Text style={inputTokenStyles.text}>{value.toFixed(2)} ETH</Text>
      <Pressable onPress={() => increment()}>
        <Image
          source={require("./assets/incrementIcon.png")}
          style={inputTokenStyles.icon}
        />
      </Pressable>
    </View>
  );
};

const inputTokenStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    height: 50
  },
  icon: {
    width: 30,
    height: 30
  },
  text: {
    fontSize: 20,
    color: "#313236"
  }
});
