import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// @ts-ignore
import deleteIcon from "../deleteIcon.png";
import { deleteAppointment, getAllAppointments } from "../api";
import Input from "../components/InputText";
import Loader from "../components/Loader";
import AppointmentModal from "../components/AppointmentDetailModal";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import moment from "moment";

const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [filterAppointmentList, setFilterAppointmentList] = useState([]);
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");

  useEffect(() => {
    getAllAppointment();
  }, []);

  useEffect(() => {
    if (appointmentList.length) {
      if (search) {
        const filteredAppointments = appointmentList.filter(item => item.summary.toLowerCase().includes(search.toLowerCase()));
        setFilterAppointmentList(filteredAppointments);
      } else {
        setFilterAppointmentList(appointmentList);
      }
    }
  }, [search]);

  const getAllAppointment = async () => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    getAllAppointments(tokens.accessToken).then(res => res.json()).then(res => {
      setAppointmentList(res.items);
      setFilterAppointmentList(res.items);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
    });
  };

  const deleteHandler = async (item) => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    await deleteAppointment(tokens.accessToken, item.id).then(() => {
      const tmpAppointmentList = JSON.parse(JSON.stringify(appointmentList));
      const obj = tmpAppointmentList.find(obj => obj.id === item.id);
      const index = tmpAppointmentList.indexOf(obj);
      tmpAppointmentList.splice(index, 1);
      setAppointmentList(tmpAppointmentList);
      setFilterAppointmentList(tmpAppointmentList);
      setSearch(null);
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

  const renderItem = ({ item }) => {
    return (<TouchableOpacity onPress={() => modalHandler(item)} style={styles.item} key={item.id}>
      <Fragment>
        <View style={styles.box}></View>
        <View style={styles.details}>
          <Text numberOfLines={1} style={styles.title}>{item.summary}</Text>
          <Text style={styles.date}>{("start" in item) ? moment(new Date(item.start.dateTime)).format("YYYY-MM-DD HH:mm A") : ""}</Text>
        </View>
        <View style={styles.delete}>
          <TouchableOpacity onPress={() => deleteHandler(item)}>
            <View style={styles.deleteButton}>
              <Image
                source={deleteIcon}
                style={styles.deleteIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Fragment>
    </TouchableOpacity>

    );
  };

  return (
    <Fragment>
      <View style={styles.container}>
        {isLoading && <Loader />}
        <View style={styles.mv10}>
          <Text style={styles.mb10}>Search</Text>
          <Input
            placeholder='Search'
            setValue={setSearch}
            value={search}
          />
        </View>
        <FlatList
          data={filterAppointmentList}
          renderItem={renderItem}
        />
      </View>
      <View>
        {modalVisible && <AppointmentModal setModalVisible={setModalVisible} modalItem={modalItem} modalVisible={modalVisible} />}
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F1",
    height: "100%",
    paddingHorizontal: 10
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 106,
    marginBottom: 15
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
  },
  box: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#FCF1D6"
  },
  details: {
    width: "50%"
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1E2022"
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: "#77838F"
  },
  delete: {
    height: 106,
    width: 65,
    borderRadius: 10
  },
  deleteButton: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA4335",
    borderRadius: 10
  },
  mv10: {
    marginVertical: 10
  },
  mb10: {
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 10
  },
  deleteIcon: {
    height: 17,
    width: 17
  }
});
export default Appointments;
