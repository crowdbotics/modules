import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  ScrollView
} from "react-native";

const NotificationListWithPreference = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Notifications</Text>
        <Text />
      </View>

      <Text style={styles.subHeading}>SYSTEM NOTIFICATIONS</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Pop up notifications</Text>
          <Switch
            trackColor={{ false: "#E5E5E5", true: "#E5E5E5" }}
            thumbColor={isEnabled ? "#000" : "#000"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.switchContainer1}>
          <Text style={styles.label}>Sound notifications</Text>
          <Switch
            trackColor={{ false: "#E5E5E5", true: "#E5E5E5" }}
            thumbColor={isEnabled1 ? "#000" : "#000"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.timeText}>5 hours ago</Text>
        <View style={styles.walletCard}>
          <Image source={require("./assets/done.png")} style={styles.image} />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>
              You have enrolled to a new class
            </Text>
            <Text style={styles.eventType}>See more details</Text>
          </View>
        </View>

        <Text style={styles.timeText}>5 hours ago</Text>
        <View style={styles.walletCard}>
          <Image source={require("./assets/cross.png")} style={styles.cross} />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Your class is Cancelled</Text>
            <Text style={styles.eventType}>See more details</Text>
          </View>
        </View>

        <Text style={styles.timeText}>5 hours ago</Text>
        <View style={styles.walletCard}>
          <Image source={require("./assets/clock.png")} style={styles.cross} />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>
              Good progress, first 1 hours finished
            </Text>
            <Text style={styles.eventType}>See more details</Text>
          </View>
        </View>

        <Text style={styles.timeText}>5 hours ago</Text>
        <View style={styles.walletCard}>
          <Image source={require("./assets/done.png")} style={styles.image} />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>
              You have enrolled to a new class
            </Text>
            <Text style={styles.eventType}>See more details</Text>
          </View>
        </View>
        <Text style={styles.timeText}>5 hours ago</Text>
        <View style={styles.walletCard}>
          <Image source={require("./assets/done.png")} style={styles.image} />
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>
              You have enrolled to a new class
            </Text>
            <Text style={styles.eventType}>See more details</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.home} />
        <Image source={require("./assets/star.png")} style={styles.home} />
        <Image source={require("./assets/search.png")} style={styles.home} />
        <Image source={require("./assets/settings.png")} style={styles.home} />
        <Image source={require("./assets/bell.png")} style={styles.home} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  sectionContainer: { backgroundColor: "#fff", marginBottom: 25 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  switchContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 10
  },
  label: { fontSize: 16, fontWeight: "400" },
  subHeading: {
    fontSize: 12,
    fontWeight: "400",
    color: "#7C7C7C",
    marginLeft: 20,
    marginBottom: 10
  },
  listContainer: {
    backgroundColor: "#FFF",
    marginVertical: 30,
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  walletCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 14,
    marginLeft: 20,
    fontWeight: "bold"
  },
  eventType: {
    color: "#ADB1B2",
    fontSize: 12,
    marginLeft: 20,
    width: 115,
    marginVertical: 5
  },
  image: { resizeMode: "contain", height: 22, width: 18, marginTop: -15 },
  cross: { resizeMode: "contain", height: 21, width: 21, marginTop: -15 },
  timeText: {
    fontSize: 12,
    color: "#300C1C",
    alignSelf: "flex-end",
    marginRight: 40,
    marginBottom: -5,
    zIndex: 99
  },
  home: { height: 22, width: 24, resizeMode: "contain" },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#C4C4C4",
    height: 74
  }
});

export default NotificationListWithPreference;
