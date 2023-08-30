import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const VideoCallPeopleList = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [people, setPeople] = useState([]);
  useEffect(() => {
    setPeople([
      {
        name: "Cody Fisher",
        image: require("./assets/userImage.png")
      },
      {
        name: "Johnny Watson",
        image: require("./assets/userImage.png")
      },
      {
        name: "Jenny Wilson",
        image: require("./assets/userImage.png")
      },
      {
        name: "Johnny Watson",
        image: require("./assets/userImage.png")
      },
      {
        name: "Jenny Wilson",
        image: require("./assets/userImage.png")
      },
      {
        name: "Johnny Watson",
        image: require("./assets/userImage.png")
      },
      {
        name: "Jenny Wilson",
        image: require("./assets/userImage.png")
      }
    ]);
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
        <Text style={styles.separatorText}>Present on the meeting</Text>
      </View>
      <ScrollView style={styles.peopleList}>
        {people.map((person, index) => (
          <View style={styles.userTile} key={index}>
            <Image source={person.image} style={styles.userImage} />
            <Text style={styles.userName}>{person.name}</Text>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/handIcon.png")}
                style={styles.meetingIcon}
              />
              <Image
                source={require("./assets/messageIcon.png")}
                style={styles.meetingIcon}
              />
            </View>
          </View>
        ))}
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
    paddingHorizontal: 20
  },
  separatorText: {
    fontSize: 16
  },
  peopleList: {},
  userTile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA"
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userName: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  meetingIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    marginHorizontal: 10
  }
});

export default VideoCallPeopleList;

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
