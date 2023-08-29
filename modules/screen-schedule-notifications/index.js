import React, { useEffect, useState } from "react";
import {
  // @ts-ignore
  Text, StyleSheet, View, Image, ScrollView, Pressable
} from "react-native";

const ScheduleNotifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "alarm",
        title: "Reminder for Alarm",
        description: "Your Reminder Appointment will be Start After 15 Minutes, Stay with App",
        time: "10:00AM"

      },
      {
        id: 2,
        type: "reminder",
        title: "Reminder for Appointment",
        description: "Your Reminder Appointment will be Notification Send.",
        time: "11:00AM"
      },
      {
        id: 3,
        type: "appointment",
        title: "Appointment Confirmed",
        description: "Your Appointment Confirmed. Dr. Sara Smith Call will be Held at 10:30 AM - 24 Dec",
        time: "12:00PM"
      }

    ]);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          // @ts-ignore
          source={require("./assets/back.png")}
          style={styles.back}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Notifications</Text>
          <Image source={require(
            // @ts-ignore
            "./assets/notification.png")} style={styles.notification} />
        </View>

        <Text style={styles.heading}>Today Jun 23:</Text>
        {
          notifications.map((notification, index) =>
            <View style={styles.listContainer} key={index}>
              <Text style={styles.timeText}>{notification.time}</Text>
              <View style={styles.walletCard}>
                <Image source={notification.type === "alarm" ? require("./assets/alarm.png") : notification.type === "reminder" ? require("./assets/reminder.png") : require("./assets/appointment.png")} style={styles.image} />
                <View style={styles.walletCarder}>
                  <Text style={styles.eventName}>{notification.title}</Text>
                  <Text style={styles.eventType}>{notification.description}</Text>
                </View>
              </View>
            </View>
          )
        }
        <View style={styles.prevContainer}>
          <Text style={[styles.heading]}>Yesterday Jun 22:</Text>
          {
            notifications.map((notification, index) =>
              index < 2 &&
              <View style={[styles.listContainer]} key={index}>
                <Text style={styles.timeText}>{notification.time}</Text>
                <View style={styles.walletCard}>
                  <Image source={notification.type === "alarm" ? require("./assets/alarm.png") : notification.type === "reminder" ? require("./assets/reminder.png") : require("./assets/appointment.png")} style={styles.image} />
                  <View style={styles.walletCarder}>
                    <Text style={styles.eventName}>{notification.title}</Text>
                    <Text style={styles.eventType}>{notification.description}</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer
          images={[
            // @ts-ignore
            require("./assets/home.png"),
            // @ts-ignore
            require("./assets/calender.png"),
            // @ts-ignore
            require("./assets/search.png"),
            // @ts-ignore
            require("./assets/user.png")
          ]}
          routes={["homeScreen", "orderStatusScreen", "searchScreen", "accountScreen"]}
          navigation={navigation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  listContainer: {
    backgroundColor: "#F6F9FE",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10
  },
  walletCard: {
    marginRight: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "bold",
    color: "#354259"
  },
  eventType: {
    color: "#A5BECC",
    fontSize: 12,
    marginLeft: 15,
    maxWidth: 280,
    marginVertical: 5,
    fontWeight: "bold"
  },

  timeText: {
    fontSize: 12,
    color: "#000",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: -5,
    zIndex: 99,
    fontWeight: "bold"
  },
  image: {
    height: 56,
    width: 56,
    resizeMode: "contain"
  },
  notification: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  back: { height: 18, width: 18, resizeMode: "contain", marginTop: 20, marginBottom: 10 },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginVertical: 15
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#1E2022" },
  subTitle: { fontSize: 12, fontWeight: "bold", color: "#1E2022" },
  heading: { fontSize: 15, fontWeight: "bold", color: "#354259", marginVertical: 5 },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  },
  prevContainer: {
    marginTop: 10,
    paddingBottom: 70
  }
});

export default ScheduleNotifications;

const Footer = props => {
  return (
    <View style={[footerStyles.footer]}>
      {props.images.map((image, index) => (
        <Pressable style={footerStyles.footerItem} key={index} onPress={() => props.navigation.navigate(props.routes[index])}>
          <Image
            style={footerStyles.footerImage}
            source={image}
          />
        </Pressable>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});
