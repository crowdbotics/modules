import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  Text,
  View,
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
import { checkLoading, getEndTime, timeSlots } from "../utils";

const CreateAppointment = ({ route, navigation }) => {
  const dispatch = useDispatch();
  // Get loading status for create appointment api from store
  const { api: createAppointmentLoading } = useSelector(
    (state) => state.Appointments.createAppointment
  );
  // Get available sessions for appointment
  const { entities: sessionEntities, api: getSessionsLoading } = useSelector(
    (state) => state.Appointments.getAppointmentSessions
  );
  // Get available appointment types for appointment
  const { entities: appointmentTypeEntities, api: getAppointmentTypesLoading } =
    useSelector((state) => state.Appointments.getAppointmentTypes);
  // Get available service providers for appointment
  const { entities: serviceProviderEntities, api: serviceProviderLoading } =
    useSelector((state) => state.Appointments.getServiceProviders);

  const options = useContext(OptionsContext);
  const { ACCESS_TOKEN, USER_ID, styles } = options;

  const { duration, selectedDate } = route.params;

  const isLoading = checkLoading(
    createAppointmentLoading,
    getSessionsLoading,
    getAppointmentTypesLoading,
    serviceProviderLoading
  );

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
    const tokenPayload = { token: ACCESS_TOKEN };
    dispatch(getAppointmentSessions(tokenPayload));
    dispatch(getAppointmentTypes(tokenPayload));
    dispatch(getServiceProviders(tokenPayload));
  }, []);

  // Dispatches create appointment API on button press
  const onCreateAppointment = async () => {
    dispatch(
      createAppointment({
        data: {
          name: title,
          add_note: description,
          selected_date: moment(selectedDate).format("YYYY-MM-DD"),
          start_time: timeSlot,
          end_time: getEndTime(timeSlot, duration),
          duration: duration,
          address: location,
          session: appointmentSession,
          appointment_type: appointmentType,
          service_provider: serviceProvider,
          client: USER_ID
        },
        token: ACCESS_TOKEN
      })
    )
      .then(unwrapResult)
      .then(() => {
        Alert.alert("Success", "Appointment is successfully created!");
        navigation.replace("Home");
      }).catch((err) => {
        __DEV__ && console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Loader />}
        <View style={styles.createAppointmentContainer}>
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

          <Text style={styles.timeSlotText}>Time Slot</Text>
          <View style={styles.timeSlotList}>
            {useMemo(() => {
              return timeSlots.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.items,
                    {
                      backgroundColor: timeSlot === item ? "#000" : "#FFF"
                    }
                  ]}
                  onPress={() => setTimeSlot(item)}
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
              ));
            }, [timeSlot])}
          </View>
          <View style={styles.createAppointmentButton}>
            <Button onPress={onCreateAppointment}>Create Appointment</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAppointment;
