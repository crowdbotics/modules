import React, { useState, useEffect, Fragment, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
// @ts-ignore
import deleteIcon from "../deleteIcon.png";
import Input from "../components/InputText";
import Loader from "../components/Loader";
import AppointmentModal from "../components/AppointmentDetailModal";
import { useDispatch } from "react-redux";
import { getAppointment, deleteAppointment } from "../store";
import { OptionsContext } from "@options";
import { unwrapResult } from "@reduxjs/toolkit";

const Appointments = () => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { ACCESS_TOKEN, styles } = options;

  const [appointmentList, setAppointmentList] = useState([]);
  // Filtered list according to their name
  const [filterAppointmentList, setFilterAppointmentList] = useState([]);
  // Search text entered
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState("");

  // Handles appointment search according to their names
  useEffect(() => {
    if (search) {
      const filteredAppointments = appointmentList.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilterAppointmentList(filteredAppointments);
    } else {
      setFilterAppointmentList(appointmentList);
    }
  }, [search]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetches all the created appointments from backend
  const fetchAppointments = () => {
    setIsLoading(true);
    dispatch(
      getAppointment({
        token: ACCESS_TOKEN
      })
    )
      .then(unwrapResult)
      .then((res) => {
        setIsLoading(false);
        setAppointmentList(res);
        setFilterAppointmentList(res);
      })
      .catch(() => setIsLoading(false));
  };

  // Deletes a specific appointment and fetches the new list.
  const onDeleteAppointment = async (id) => {
    dispatch(
      deleteAppointment({
        id,
        token: ACCESS_TOKEN
      })
    )
      .then(unwrapResult)
      .then(() => fetchAppointments());
  };

  // Opens and passes the appointment data to the modal
  const modalHandler = (item) => {
    setAppointmentDetails(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.appointmentDetailContainer}>
          {isLoading && <Loader />}
          <View style={styles.mv10}>
            <Text style={styles.mb10}>Search</Text>
            <Input placeholder="Search" setValue={setSearch} value={search} />
          </View>
          {!isLoading &&
            filterAppointmentList.map((item) => (
              <TouchableOpacity
                onPress={() => modalHandler(item)}
                style={styles.item}
                key={item.id}
              >
                <Fragment>
                  <View style={styles.box} />
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text
                      style={styles.date}
                    >{`${item.selected_date}, ${item.start_time}`}</Text>
                  </View>
                  <View style={styles.delete}>
                    <TouchableOpacity onPress={() => onDeleteAppointment(item.id)}>
                      <View style={styles.deleteButton}>
                        <Image source={deleteIcon} style={styles.deleteIcon} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              </TouchableOpacity>
            ))}
          <AppointmentModal
            setModalVisible={setModalVisible}
            modalItem={appointmentDetails}
            modalVisible={modalVisible}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointments;
