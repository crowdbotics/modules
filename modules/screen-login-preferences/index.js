import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Pressable,
  FlatList,
  Image
} from "react-native";

const LoginPreferences = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState([]);
  const [selectedSettings, setSelectedSettings] = useState([]);
  useEffect(() => {
    setSettings([
      {
        title: "System Notifications",
        list: ["Standard", "Biometric"]
      },
      {
        title: "Choose Biometric",
        list: ["Fingerprint", "Face recognition", "Fingerprint + Face"]
      }
    ]);
  }, []);
  const handleSelect = name => {
    if (selectedSettings.includes(name)) {
      setSelectedSettings(selectedSettings.filter(x => x !== name));
    } else {
      setSelectedSettings([...selectedSettings, name]);
    }
  };
  return (
    <View style={styles.container}>
      <TabView
        tabTitles={["Login Type", "General"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
        backgroundColor="#CCC"
      />
      <FlatList
        data={settings}
        renderItem={({ item }) => (
          <View style={styles.settingsTabContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {item.list &&
              item.list.map((x, index) => (
                <View key={index} style={styles.settingsItemContainer}>
                  <View
                    style={[
                      styles.settingsItem,
                      index === item.list.length - 1
                        ? null
                        : styles.borderBottom
                    ]}>
                    <Text>{x}</Text>
                    <Switch
                      value={selectedSettings.includes(x)}
                      onValueChange={() => handleSelect(x)}
                    />
                  </View>
                </View>
              ))}
          </View>
        )}
        keyExtractor={item => item.title}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.title}>Enter Password</Text>
            <View style={styles.settingsItemContainer}>
              <View style={styles.settingsItem}>
                <Text style={styles.password}>**********</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.footerItem}>
                <Image
                  source={require("./assets/fingerprintIcon.png")}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>Set Up Fingerprint</Text>
              </View>
              <View style={styles.footerItem}>
                <Image
                  source={require("./assets/faceIDIcon.png")}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>Set Up Fingerprint</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5"
  },
  heading: {
    fontSize: 20
  },
  tabView: {
    marginHorizontal: 20,
    width: "70%"
  },
  settingsTabContainer: {
    marginBottom: 10
  },
  settingsItemContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    height: 50,
    justifyContent: "center"
  },
  settingsItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%"
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  title: {
    fontSize: 14,
    color: "#7C7C7C",
    marginLeft: 20,
    marginBottom: 10
  },
  password: {
    fontSize: 30,
    color: "#7C7C7C"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  footerItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginHorizontal: 30
  },
  footerIcon: {
    width: 80,
    height: 80,
    marginBottom: 20
  },
  footerText: {
    textAlign: "center"
  }
});

export default LoginPreferences;

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
