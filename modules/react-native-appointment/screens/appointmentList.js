import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// @ts-ignore
import CalendarStrip from "react-native-calendar-strip";
import { getAppointmentByDate } from "../api";
import Loader from "../components/Loader";
// @ts-ignore
import { useFocusEffect } from "@react-navigation/native";
import AppointmentModal from "../components/AppointmentDetailModal";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import moment from "moment";

const Appointment = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState((new Date()).toISOString());
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getAllAppointment();
    }, [filterDate])
  );

  const getAllAppointment = async () => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    getAppointmentByDate(tokens.accessToken, 100, filterDate).then(res => res.json()).then(res => {
      setFilteredAppointments(res.items);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
    });
  };

  const modalHandler = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => modalHandler(item)}>
      <View style={styles.appointmentItem}>
        <Text style={styles.listText}>{("start" in item) ? moment(new Date(item.start.dateTime)).format("h:mm A") : ""}</Text>
        <View style={[styles.card]}>
          <Text numberOfLines={1} style={{ fontSize: 16 }}>{item.summary}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.calendarTextContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <CalendarStrip
        selectedDate={filterDate}
        daySelectionAnimation={{ type: "background", duration: 10, highlightColor: "#E6E6E6" }}
        style={{ height: 100, paddingBottom: 10 }}
        onDateSelected={(date) => setFilterDate((new Date(date)).toISOString())}
      />
      <View>
        <View style={styles.viewAll}>
          <Text style={styles.listText}>List of Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Appointments")}>
            <Text style={styles.listText}>View all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filteredAppointments.length && filteredAppointments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      { modalVisible && <AppointmentModal setModalVisible={setModalVisible} modalItem={modalItem} modalVisible={modalVisible}/> }

    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    padding: 10,
    height: "100%",
    width: "100%"
  },
  calendarText: {
    fontSize: 14,
    color: "#1E2022"
  },
  calendarTextContainer: {
    marginTop: 20,
    marginLeft: 14
  },
  listText: {
    fontSize: 14,
    color: "#1E2022"
  },
  viewAll: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 14
  },
  appointmentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  card: {
    backgroundColor: "#FCF1D6",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
export default Appointment;
