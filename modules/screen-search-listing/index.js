import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput
} from "react-native";

const SearchListingScreen = (params) => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Search</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            placeholder="Enter"
            placeholderTextColor="#9B9B9B"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <Text style={styles.headerText}>Search results</Text>
      <ScrollView style={styles.list}>
        {appointments.map((item, index) => (
          <Appointment item={item} key={index} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 16,
    padding: 2,
    marginHorizontal: 20
  },
  list: {
    paddingTop: 0,
    marginHorizontal: 20,
    backgroundColor: "#f1f1f1"
  },
  listContainer: {
    margin: 0
  },
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5
  },
  inputText: {
    fontSize: 16,
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
    height: 50
  }
});
export default SearchListingScreen;

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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6"
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
