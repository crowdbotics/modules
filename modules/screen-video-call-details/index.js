import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput
} from "react-native";

const VideoCallDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [meetingDetails, setMeetingDetails] = useState({});
  useEffect(() => {
    setMeetingDetails({
      title: "Sales Strategy Session",
      pin: 45620,
      url: "https://crowdbotics/abc.test-123"
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.roundIconContainer}>
          <Image
            source={require("./assets/videoIcon.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.roundIconContainer}>
          <Image
            source={require("./assets/voiceIcon.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.roundIconContainer}>
          <Image
            source={require("./assets/phoneIcon.png")}
            style={styles.icon}
          />
        </View>
        <View style={[styles.roundIconContainer, styles.redBg]}>
          <Image
            source={require("./assets/callIcon.png")}
            style={styles.icon}
          />
        </View>
      </View>
      <TabView
        tabTitles={["People", "Details"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
      />
      <View style={styles.separator}>
        <Text style={styles.separatorText}>{meetingDetails.title}</Text>
      </View>
      <Input
        value={meetingDetails.url}
        editable={false}
        icon={require("./assets/linkIcon.png")}
        containerStyle={styles.input}
      />
      <Input
        value={"PIN: " + meetingDetails.pin}
        editable={false}
        icon={require("./assets/pinIcon.png")}
        containerStyle={styles.input}
      />
      <Button buttonText="Share Joining Info" style={styles.button}>
        <Image
          source={require("./assets/shareIcon.png")}
          style={styles.btnIcon}
        />
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  },
  header: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "#FCF1D6",
    height: 180,
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  roundIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  redBg: {
    backgroundColor: "#EA4335"
  },
  tabView: {
    marginVertical: 20,
    marginHorizontal: 20,
    width: "70%"
  },
  separator: {
    height: 50,
    backgroundColor: "#DADADA",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  separatorText: {
    fontSize: 16
  },
  input: {
    marginHorizontal: 20
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  btnIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginLeft: 10
  }
});

export default VideoCallDetails;

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
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
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

const Input = props => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={() => props.onChange()}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
        backgroundColor={props.backgroundColor}
        secureTextEntry={props.secureTextEntry}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Pressable
          onPress={() => props.iconOnPress()}
          style={inputStyles.iconWithText}>
          <Image source={props.icon} style={inputStyles.icon} />
        </Pressable>
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    bottom: 25,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
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
