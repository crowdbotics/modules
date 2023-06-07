import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList
} from "react-native";

const AppointmentListScreen = (params) => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    setAppointments([
      {
        id: 1,
        name: "Appointment",
        date: "17 June 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 2,
        name: "Appointment",
        date: "17 May 2022",
        time: "02:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 3,
        name: "Appointment",
        date: "17 April 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 4,
        name: "Appointment",
        date: "17 March 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 5,
        name: "Appointment",
        date: "17 March 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 6,
        name: "Appointment",
        date: "17 March 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      },
      {
        id: 7,
        name: "Appointment",
        date: "17 March 2022",
        time: "12:00 AM",
        image: require("./assets/crowdbotics.png")
      }
    ]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Appointments</Text>
        <Image source={require("./assets/calendar.png")} />
      </View>
      <FlatList
        style={styles.list}
        data={appointments}
        keyExtractor={(appointment) => appointment.id.toString()}
        renderItem={({ item }) => <Appointment item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  },
  list: {
    paddingTop: 0,
    marginHorizontal: 20,
    backgroundColor: "#f1f1f1"
  },
  listContainer: {
    margin: 0
  }
});
export default AppointmentListScreen;

const Appointment = ({ item }) => {
  return (
    <View style={appointmentStyles.appointmentContainer}>
      <View style={appointmentStyles.imgContainer}>
        <Image source={item.image} style={appointmentStyles.img} />
      </View>
      <View style={appointmentStyles.desContainer}>
        <Text>{item.name}</Text>
        <View style={appointmentStyles.timings}>
          <Text style={appointmentStyles.timingText}>{item.date}</Text>
          <Text style={appointmentStyles.timingText}>,</Text>
          <Text style={appointmentStyles.timingText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
};

const appointmentStyles = StyleSheet.create({
  appointmentContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#ddd",
    height: 80,
    width: 80
  },
  desContainer: {
    width: "70%",
    justifyContent: "space-between",
    height: "60%",
    alignItems: "flex-start"
  },
  timings: {
    flexDirection: "row"
  },
  timingText: {
    color: "grey"
  }
});
