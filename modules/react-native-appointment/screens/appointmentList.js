import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native"; // @ts-ignore

import CalendarStrip from "react-native-calendar-strip";
import Loader from "../components/Loader"; // @ts-ignore
import { getAppointmentByDate } from "../store";
import { useDispatch } from "react-redux";
import AppointmentModal from "../components/AppointmentDetailModal"; // @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import moment from "moment";
import { unwrapResult } from "@reduxjs/toolkit";
import { OptionsContext } from "@options";

/**
 * Component to display appointments for a specific date.
 * @param {Object} navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} - The rendered Appointment component.
 */
const Appointment = ({ navigation }) => {
  const { styles } = useContext(OptionsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date().toISOString());
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch appointments when screen loads and when filterDate changes.
    getAllAppointment();
  }, [filterDate]);

  const getAllAppointment = async () => {
    setIsLoading(true);
    // access google authorization token with calendar scope
    const googleAuthorizationToken = await GoogleSignin.getTokens();
    await dispatch(
      getAppointmentByDate({
        accessToken: googleAuthorizationToken.accessToken,
        maxResults: 100,
        datetime: filterDate
      })
    )
      .then(unwrapResult)
      .then((res) => {
        __DEV__ && console.log(res);
        setFilteredAppointments(res.items);
        setIsLoading(false);
      })
      .catch((error) => {
        __DEV__ && console.log(error);
        setIsLoading(false);
      });
  };

  const toggleModal = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  /**
   * Render a single item in the appointment list.
   * @param {Object} param0 - The item to be rendered along with the toggleModal function.
   * @param {Object} param0.item - The appointment item data.
   * @param {function} param0.toggleModal - The function to toggle the modal with the item data as a parameter.
   * @returns {JSX.Element} - The rendered appointment item component.
   */
  const renderItem = ({ item }) => {
    const formatTime = (dateTime) => {
      // Format the start dateTime to "h:mm A" format (e.g., 9:00 AM).
      return moment(new Date(dateTime)).format("h:mm A");
    };

    return (
      <TouchableOpacity onPress={() => toggleModal(item)}>
        <View style={styles.appointmentItem}>
          <Text style={styles.listText}>
            {"start" in item ? formatTime(item.start.dateTime) : ""}
          </Text>
          <View style={styles.card}>
            <Text numberOfLines={1} style={styles.eWkmXrRh}>
              {item.summary}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.appointmentListContainer}>
      {isLoading && <Loader />}
      <View style={styles.calendarTextContainer}>
        <Text style={styles.calendarText}>Calendar</Text>
      </View>
      <CalendarStrip
        selectedDate={filterDate}
        daySelectionAnimation={{
          type: "background",
          duration: 10,
          highlightColor: "#E6E6E6"
        }}
        style={styles.vFIpjHzC}
        onDateSelected={(date) => setFilterDate(new Date(date).toISOString())}
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
        data={filteredAppointments?.length && filteredAppointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {modalVisible && (
        <AppointmentModal
          setModalVisible={setModalVisible}
          modalItem={modalItem}
          modalVisible={modalVisible}
        />
      )}
    </View>
  );
};

export default Appointment;
