import React, { useState, useEffect, Fragment, useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"; // @ts-ignore
import deleteIcon from "../deleteIcon.png";
import { deleteAppointment, getAllAppointments } from "../api";
import Input from "../components/InputText";
import Loader from "../components/Loader";
import AppointmentModal from "../components/AppointmentDetailModal"; // @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import moment from "moment";
import { OptionsContext } from "@options";

/**
 * Component to display a list of appointments and perform search, delete, and modal actions.
 * @returns {JSX.Element} - The rendered Appointments component.
 */
const Appointments = () => {
  const { styles } = useContext(OptionsContext);
  const [appointmentList, setAppointmentList] = useState([]);
  const [filterAppointmentList, setFilterAppointmentList] = useState([]);
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");

  useEffect(() => {
    // Fetch all appointments when the component mounts.
    getAllAppointment();
  }, []);

  useEffect(() => {
    // Update the filtered appointment list when search changes.
    if (appointmentList.length) {
      if (search) {
        const filteredAppointments = appointmentList.filter((item) =>
          item.summary.toLowerCase().includes(search.toLowerCase())
        );
        setFilterAppointmentList(filteredAppointments);
      } else {
        setFilterAppointmentList(appointmentList);
      }
    }
  }, [search]);

  const getAllAppointment = async () => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    getAllAppointments(tokens.accessToken)
      .then((res) => res.json())
      .then((res) => {
        setAppointmentList(res.items);
        setFilterAppointmentList(res.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // Deletes a specific appointment
  const onDeletePress = async (id) => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    await deleteAppointment(tokens.accessToken, id)
      .then(() => {
        const tmpAppointmentList = JSON.parse(JSON.stringify(appointmentList));
        const obj = tmpAppointmentList.find((obj) => obj.id === id);
        const index = tmpAppointmentList.indexOf(obj);
        tmpAppointmentList.splice(index, 1);
        setAppointmentList(tmpAppointmentList);
        setFilterAppointmentList(tmpAppointmentList);
        setSearch(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const toggleModal = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  /**
   * Render a single item in the appointment list.
   * @param {Object} item - The appointment item data.
   * @returns {JSX.Element} - The rendered appointment item component.
   */
  const renderItem = ({ item }) => {
    const formatTime = () => {
      // Format the start dateTime to "YYYY-MM-DD h:mm A" format (e.g., 2021-04-02 9:00 AM).
      return moment(new Date(item.start.dateTime)).format("YYYY-MM-DD HH:mm A");
    };
    return (
      <TouchableOpacity
        onPress={() => toggleModal(item)}
        style={styles.item}
        key={item.id}
      >
        <Fragment>
          <View style={styles.box} />
          <View style={styles.details}>
            <Text numberOfLines={1} style={styles.title}>
              {item.summary}
            </Text>
            <Text style={styles.dateText}>
              {"start" in item ? formatTime() : ""}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.deleteView}
            onPress={() => onDeletePress(item.id)}
          >
            <View style={styles.deleteButton}>
              <Image source={deleteIcon} style={styles.deleteIcon} />
            </View>
          </TouchableOpacity>
        </Fragment>
      </TouchableOpacity>
    );
  };

  return (
    <Fragment>
      <View style={styles.appointmentContainer}>
        {isLoading && <Loader />}
        <View style={styles.mv10}>
          <Text style={styles.mb10}>Search</Text>
          <Input placeholder="Search" setValue={setSearch} value={search} />
        </View>
        <FlatList data={filterAppointmentList} renderItem={renderItem} />
      </View>
      {modalVisible && (
        <AppointmentModal
          setModalVisible={setModalVisible}
          modalItem={modalItem}
          modalVisible={modalVisible}
        />
      )}
    </Fragment>
  );
};

export default Appointments;
