import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// @ts-ignore
import CalendarStrip from "react-native-calendar-strip";
import { getAppointment } from "../api";
import Loader from "../components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { dateFunc } from "../utils";
import AppointmentModal from "../components/AppointmentDetailModal";

const Appointment = ({ navigation }) => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getAppointment().then(res => res.json()).then(res => {
        setAppointmentList(res);
        setFilteredAppointments(res);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        setIsLoading(false);
      });
    }, [])
  );

  useEffect(() => {
    if (filterDate) {
      const appointmentFilter = appointmentList.filter(item => {
        return item.selected_date === filterDate;
      });
      setFilteredAppointments(appointmentFilter);
    } else {
      setFilteredAppointments(appointmentList);
    }
  }, [filterDate]);

  const modalHandler = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => modalHandler(item)}>
      <View style={styles.appointmentItem}>
        <Text style={styles.listText}>{item.time_slot}</Text>
        <View style={styles.card}>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
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
        daySelectionAnimation={{ type: "background", duration: 10, highlightColor: "#E6E6E6" }}
        style={{ height: 100, paddingBottom: 10 }}
        onDateSelected={(date) => setFilterDate(dateFunc(new Date(date)))}
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
      <AppointmentModal setModalVisible={setModalVisible} modalItem={modalItem} modalVisible={modalVisible}/>

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
    backgroundColor: "#DADADA",
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
