import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const NotificationsScreen = (params) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "Booking Successful",
        details: "You have booked Kreamy Corner",
        time: "5 min ago",
        read: false
      },
      {
        id: 2,
        type: "Booking Successful",
        details: "You have booked Kreamy Corner",
        time: "5 min ago",
        read: false
      },
      {
        id: 3,
        type: "Event Reminder",
        details: "Your next event will be held after 2 hours.",
        time: "5 min ago",
        read: true
      },
      {
        id: 4,
        type: "Event Reminder",
        details: "Your next event will be held after 2 hours.",
        time: "5 min ago",
        read: true
      },
      {
        id: 5,
        type: "Event Reminder",
        details: "Your next event will be held after 2 hours.",
        time: "5 min ago",
        read: true
      },
      {
        id: 6,
        type: "Event Reminder",
        details: "Your next event will be held after 2 hours.",
        time: "5 min ago",
        read: true
      },
      {
        id: 7,
        type: "Event Reminder",
        details: "Your next event will be held after 2 hours.",
        time: "5 min ago",
        read: true
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
    backgroundColor: "#fff"
  },
  header: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
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
    flex: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  }
});
export default NotificationsScreen;
