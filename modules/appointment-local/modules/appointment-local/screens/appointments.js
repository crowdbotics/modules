import React, { useState, useEffect, Fragment } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
// @ts-ignore
import deleteIcon from "../deleteIcon.png";
import { deleteAppointment, getAppointment } from "../api";
import Input from "../components/InputText";
import Loader from "../components/Loader";
import AppointmentModal from "../components/AppointmentDetailModal";

const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [filterAppointmentList, setFilterAppointmentList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");

  useEffect(() => {
    if (search !== "") {
      const filteredAppointments = appointmentList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
      setFilterAppointmentList(filteredAppointments);
    } else {
      setFilterAppointmentList(appointmentList);
    }
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    getAppointment().then(res => res.json()).then(res => {
      setAppointmentList(res);
      setFilterAppointmentList(res);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
    });
  }, []);

  const deleteHandler = async (id) => {
    setIsLoading(true);
    await deleteAppointment(id).then((res) => getAppointment())
      .then(res => res.json()
        .then(res => setFilterAppointmentList(res)))
      .catch(error => console.log(error));

    setIsLoading(false);
  };
  const modalHandler = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
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
          {!isLoading && filterAppointmentList.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => modalHandler(item)} style={styles.item} key={item.id}>
                <Fragment>
                  <View style={styles.box}></View>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{`${item.selected_date}, ${item.time_slot}`}</Text>
                  </View>
                  <View style={styles.delete}>
                    <TouchableOpacity onPress={() => deleteHandler(item.id)}>
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
          })}
          <View>
            <AppointmentModal setModalVisible={setModalVisible} modalItem={modalItem} modalVisible={modalVisible}/>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#F1F1F1",
    height: "100%"
  },
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
    width: 60,
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
