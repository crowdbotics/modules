import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const NotificationsListingScreen = (params) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "Post Liked",
        details: "You have post liked by Kreamy Corner",
        time: "5 min ago",
        read: false
      },
      {
        id: 2,
        type: "Post flagged",
        details: "Post flagged by Kreamy Corner",
        time: "5 min ago",
        read: false
      },
      {
        id: 3,
        type: "New Group Created",
        details: "You have created a new group",
        time: "5 min ago",
        read: true
      },
      {
        id: 4,
        type: "New Group Created",
        details: "You have created a new group",
        time: "5 min ago",
        read: true
      },
      {
        id: 5,
        type: "New Group Created",
        details: "You have created a new group",
        time: "5 min ago",
        read: true
      },
      {
        id: 6,
        type: "New Group Created",
        details: "You have created a new group",
        time: "5 min ago",
        read: true
      },
      {
        id: 7,
        type: "New Group Created",
        details: "You have created a new group",
        time: "5 min ago",
        read: true
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TabView tabTitles={["Preferences", "Extended"]} selected={1} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Select all</Text>
          <Text style={styles.headerText}>Mark all</Text>
        </View>
      </View>
      <View style={styles.notificationsContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.map((notification, index) => (
            <NotificationTile notification={notification} key={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const NotificationTile = ({ notification }) => {
  const textColor = {
    color: notification.read ? "#8E8E8E" : "#000"
  };
  return (
    <View style={notificationTileStyles.container}>
      <View style={notificationTileStyles.notificationTextContainer}>
        <Text style={[notificationTileStyles.mainText, textColor]}>
          {notification.type}
        </Text>
        <Text style={textColor}>{notification.details}</Text>
      </View>
      <View style={notificationTileStyles.timeContainer}>
        <Text style={textColor}>{notification.time}</Text>
        <View>
          {!notification.read
            ? (
            <Image source={require("./assets/readIcon.png")} />
              )
            : null}
        </View>
      </View>
    </View>
  );
};

const notificationTileStyles = StyleSheet.create({
  container: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    alignItems: "center"
  },
  notificationTextContainer: {
    flexDirection: "column",
    height: "80%",
    justifyContent: "space-around" // alignItems: "center"
  },
  mainText: {
    fontSize: 18,
    marginVertical: 10
  },
  timeContainer: {
    height: "80%",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  header: {
    flex: 1.5,
    paddingVertical: 10,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  },
  headerTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  notificationsContainer: {
    flex: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  }
});
export default NotificationsListingScreen;

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 10
  }
});
