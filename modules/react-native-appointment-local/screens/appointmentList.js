import React, { useState, useCallback, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
// @ts-ignore
import CalendarStrip from "react-native-calendar-strip";
import Loader from "../components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "../utils";
import AppointmentModal from "../components/AppointmentDetailModal";
import { useDispatch } from "react-redux";
import { getAppointment } from "../store";
import { OptionsContext } from "@options";
import { unwrapResult } from "@reduxjs/toolkit";

const Appointment = ({ navigation }) => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { styles, ACCESS_TOKEN } = options;

  // Saves all the appointments
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  // Date selected from calendar
  const [filterDate, setFilterDate] = useState("");
  // Filtered appointments according to their dates
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Fetches all the created appointments from backend
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      dispatch(
        getAppointment({
          token: ACCESS_TOKEN
        })
      )
        .then(unwrapResult)
        .then((res) => {
          setAppointmentList(res);
          setFilteredAppointments(res);
          setIsLoading(false);
        })
        .catch((err) => __DEV__ && console.log(err));
    }, [])
  );

  // Handles appointment filteration according to the selected date
  useEffect(() => {
    if (filterDate) {
      const appointmentFilter = appointmentList.filter(
        item => item.selected_date === filterDate
      );
      setFilteredAppointments(appointmentFilter);
    } else {
      setFilteredAppointments(appointmentList);
    }
  }, [filterDate]);

  const modalHandler = item => {
    setAppointmentDetails(item);
    setModalVisible(true);
  };

  // Appointment component which shows its title and start time
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => modalHandler(item)}>
      <View style={styles.appointmentItem}>
        <Text style={styles.listText}>{item.start_time}</Text>
        <View style={styles.appointmentNameCard}>
          <Text style={styles.appointmentName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.appointmentListContainer}>
      {isLoading && <Loader />}
      <View style={styles.calendarTextContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <CalendarStrip
        daySelectionAnimation={{
          type: "background",
          duration: 10,
          highlightColor: "#E6E6E6"
        }}
        style={styles.calendarStrip}
        onDateSelected={(date) => setFilterDate(formatDate(new Date(date)))}
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
        keyExtractor={(item) => item.id}
      />
      <AppointmentModal
        setModalVisible={setModalVisible}
        modalItem={appointmentDetails}
        modalVisible={isModalVisible}
      />
    </View>
  );
};

export default Appointment;
