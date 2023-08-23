import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import Input from "../components/InputText";
// @ts-ignore
import { OptionsContext } from "@options";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  createAppointment,
  getAppointmentSessions,
  getAppointmentTypes,
  getServiceProviders
} from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";
import { checkLoading } from "../utils";

const CreateAppointment = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { api: createAppointmentLoading } = useSelector(
    (state) => state.Appointments.createAppointment
  );

  const { entities: sessionEntities, api: getSessionsLoading } = useSelector(
    (state) => state.Appointments.getAppointmentSessions
  );
  const { entities: appointmentTypeEntities, api: getAppointmentTypesLoading } =
    useSelector((state) => state.Appointments.getAppointmentTypes);

  const { entities: serviceProviderEntities, api: serviceProviderLoading } =
    useSelector((state) => state.Appointments.getServiceProviders);

  const options = useContext(OptionsContext);

  const { ACCESS_TOKEN } = options;

  const tokenPayload = { token: ACCESS_TOKEN };

  const { duration, selectedDate } = route.params;

  const isLoading = checkLoading(
    createAppointmentLoading,
    getSessionsLoading,
    getAppointmentTypesLoading,
    serviceProviderLoading
  );
    console.log("ISLOADING",isLoading)
    
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState(route.params.timeSlot);

  // States for appointment session dropdown
  const [appointmentSessionDropdown, setAppointmentSessionDropdown] =
    useState(false);
  const [appointmentSession, setAppointmentSession] = useState(false);
  // States for appointment type dropdown
  const [appointmentTypeDropdown, setAppointmentTypeDropdown] = useState(false);
  const [appointmentType, setAppointmentType] = useState([]);
  // States for service provider dropdown
  const [serviceProviderDropdown, setServiceProviderDropdown] = useState(false);
  const [serviceProvider, setServiceProvider] = useState(false);

  useEffect(() => {
    dispatch(getAppointmentSessions(tokenPayload));
    dispatch(getAppointmentTypes(tokenPayload));
    dispatch(getServiceProviders(tokenPayload));
  }, []);

  const selectTimeSlot = (item) => {
    setTimeSlot(item);
  };
  const pressHandler = async () => {
    dispatch(
      createAppointment({
        data: {
          name: title,
          add_note: description,
          selected_date: moment(selectedDate).format("YYYY-MM-DD"),
          start_time: timeSlot,
          end_time: getEndTime(),
          duration: duration,
          address: location,
          session: appointmentSession,
          appointment_type: appointmentType,
          service_provider: serviceProvider,
          client: 1
        },
        token: ACCESS_TOKEN
      })
    )
      .then(unwrapResult)
      .then(() => {
        Alert.alert("Success", "Appointment is successfully created!");
        navigation.replace("Home");
      });
  };

  const getEndTime = () => {
    // Parse the time strings into Moment.js duration objects
    const duration1 = moment.duration(timeSlot);
    const duration2 = moment.duration(duration);

    // Add the durations together
    const totalDuration = duration1.add(duration2);

    // Get the total time in "HH:mm:ss" format
    const totalTime = moment
      .utc(totalDuration.asMilliseconds())
      .format("HH:mm:ss");
    return totalTime;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Loader />}
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{selectedDate}</Text>
              <Text style={styles.headerText}>Appointment date</Text>
            </View>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{timeSlot}</Text>
              <Text style={styles.headerText}>Time</Text>
            </View>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{duration}</Text>
              <Text style={styles.headerText}>Duration</Text>
            </View>
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Title</Text>
            <Input placeholder="Title" setValue={setTitle} value={title} />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
            <Input
              placeholder="Location"
              setValue={setLocation}
              value={location}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Description</Text>
            <Input
              placeholder="Description"
              setValue={setDescription}
              value={description}
              multiline={true}
            />
          </View>

          <View style={styles.mt15} zIndex={3}>
            <Text style={styles.mb10}>Session</Text>
            <DropDownPicker
              style={styles.dropdown}
              open={appointmentSessionDropdown}
              value={appointmentSession}
              items={sessionEntities}
              setOpen={setAppointmentSessionDropdown}
              setValue={setAppointmentSession}
            />
          </View>

          <View style={styles.mt15} zIndex={3}>
            <Text style={styles.mb10}>Appointment Type</Text>
            <DropDownPicker
              style={styles.dropdown}
              open={appointmentTypeDropdown}
              value={appointmentType}
              items={appointmentTypeEntities}
              setOpen={setAppointmentTypeDropdown}
              setValue={setAppointmentType}
              multiple={true}
              min={0}
              max={2}
            />
          </View>

          <View style={styles.mt15} zIndex={3}>
            <Text style={styles.mb10}>Service Provider</Text>
            <DropDownPicker
              style={styles.dropdown}
              open={serviceProviderDropdown}
              value={serviceProvider}
              items={serviceProviderEntities}
              setOpen={setServiceProviderDropdown}
              setValue={setServiceProvider}
            />
          </View>

          <Text style={{ marginVertical: 20, fontSize: 14 }}>Time Slot</Text>
          <View style={styles.list}>
            {options.timeSlots.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.items,
                  {
                    backgroundColor: timeSlot === item ? "#000" : "#FFF"
                  }
                ]}
                onPress={() => selectTimeSlot(item)}
                key={index}
              >
                <Text
                  style={{
                    color: timeSlot === item ? "#FFF" : "#000"
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.button}>
            <Button onPress={pressHandler}>Create Appointment</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { height: "100%", padding: 10 },
  dropdown: {
    borderColor: "#C4C4C4",
    height: 53
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 17,
    borderColor: "#F0F2F7",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  headItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerComponents: { fontSize: 22, color: "#313633" },
  headerText: { fontSize: 14, color: "#7C7C7C", marginTop: 8 },
  mt15: { marginTop: 15 },
  mb10: { marginBottom: 10, fontSize: 14, marginLeft: 10 },
  items: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D8D8D8",
    width: 90,
    height: 30,
    margin: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  list: { display: "flex", flexDirection: "row", flexWrap: "wrap" },
  button: { padding: 15 }
});
export default CreateAppointment;
