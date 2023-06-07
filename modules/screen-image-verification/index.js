import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const ImageVerification = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [aspectRatios, setAspectRatios] = useState([]);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(null);
  const [tips, setTips] = useState([]);
  useEffect(() => {
    setAspectRatios(["1:1", "2:3", "3:2", "3:4", "4:3", "4:5"]);
    setTips([
      "Center yourself and smile at the camera",
      "Take a headshot - from the chest up",
      "Make sure it's focused and well lit",
      "Remove any hats or sunglasses"
    ]);
  }, []);
  const getAspectRatio = (name) => {
    const dimension = name.split(":");
    const style = {
      width: 10 * parseInt(dimension[0], 10),
      height: 10 * parseInt(dimension[1], 10),
      padding:
        18 / ((parseInt(dimension[0], 10) + parseInt(dimension[1], 10)) / 2),
      borderRadius: 5
    };
    return style;
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Verification</Text>
        <View style={styles.imageContainer}>
          <Image source={require("./assets/image.png")} style={styles.image} />
        </View>
        <TabView
          tabTitles={["Crop", "Filters", "Edits", "Shadows"]}
          selected={selectedTab}
          onPress={setSelectedTab}
        />
        <View style={styles.ratiosContainer}>
          {aspectRatios.map((ratio, index) => (
            <Pressable
              key={index}
              style={styles.ratioItem}
              onPress={() => setSelectedAspectRatio(ratio)}
            >
              <View
                style={[
                  getAspectRatio(ratio),
                  styles.ratio,
                  selectedAspectRatio === ratio ? styles.selectedRatio : null
                ]}
              />
              <Text>{ratio}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.title}>
          A good photo increases your likelihood of being hired. Some photo tips
          include
        </Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipContainer}>
            <View style={styles.bullet} />
            <Text style={styles.tip}>{tip}</Text>
          </View>
        ))}
        <Text>
          There may be a delay in account activation if your photo does not meet
          these guidelines. <Text style={styles.red}>More info</Text>
        </Text>
        <Button buttonText="Upload Photo" style={styles.button} />
      </ScrollView>
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
    fontSize: 25,
    fontWeight: "bold"
  },
  imageContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 190,
    width: 350,
    marginTop: 20,
    alignSelf: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  ratiosContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ratioItem: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10
  },
  ratio: {
    borderColor: "#77838F",
    borderWidth: 2
  },
  selectedRatio: {
    borderColor: "#12D790"
  },
  title: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 2,
    marginRight: 10
  },
  red: {
    color: "#D70404"
  },
  button: {
    marginTop: 10
  }
});

export default ImageVerification;

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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
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
          <Text>{title}</Text>
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
          style={[buttonStyles.btn, btnStyle, params.style]}
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
