import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Input from "../components/InputText";
// @ts-ignore
import { OptionsContext } from "@options";
import Button from "../components/Button";
import { createAppointment } from "../api";
import Loader from "../components/Loader";
import moment from "moment";
import { validateEmail } from "../utils";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const CreateAppointment = ({ route, navigation }) => {
  const options = useContext(OptionsContext);
  const { duration, selectedDate } = route.params;
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState(route.params.timeSlot);
  const [isLoading, setIsLoading] = useState(false);
  const [attendeesList, setAttendeesList] = useState([]);
  const [attendee, setAttendee] = useState("");
  const [validationError, setValidationError] = useState({
    email: ""
  });
  const selectTimeSlot = (item) => {
    setTimeSlot(item);
  };
  const pressHandler = async () => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();
    await createAppointment(tokens.accessToken, {
      summary: title,
      description: description,
      location: location,
      start: {
        dateTime: moment(`${selectedDate} ${timeSlot}`).format()
      },
      end: {
        dateTime: moment(`${selectedDate} ${timeSlot}`).add(moment.duration(duration)).format()
      },
      attendees: attendeesList,
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          },
          requestId: Date.now().toString()
        }
      }
    })
      .then(() => {
        setIsLoading(false);
        navigation.replace("Home");
      }).catch(e => console.log(e));
  };

  const addAttendee = () => {
    if (!validateEmail.test(attendee)) {
      return setValidationError({
        email: "Please enter a valid email address."
      });
    } else {
      setValidationError({
        email: ""
      });
    }
    setAttendeesList(attendeesList => [...attendeesList, { email: attendee }]);
    setAttendee("");
  };

  const handleChangeAttendee = (text) => {
    setAttendee(text);
    setValidationError({ email: "" });
  };

  const handleRemoveAttendee = (index) => {
    const tmpAttendeesList = JSON.parse(JSON.stringify(attendeesList));
    tmpAttendeesList.splice(index, 1);
    setAttendeesList(tmpAttendeesList);
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
            </View >
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{duration}</Text>
              <Text style={styles.headerText}>Duration</Text>
            </View>
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Title</Text>
            <Input
              placeholder='Title'
              setValue={setTitle}
              value={title}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
            <Input
              placeholder='Location'
              setValue={setLocation}
              value={location}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Description</Text>
            <Input
              placeholder='Description'
              setValue={setDescription}
              value={description}
              multiline={true} />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Participants</Text>
            <View style={styles.attendeeContainer}>
              <Input
                placeholder='Participant Email'
                setValue={handleChangeAttendee}
                value={attendee}
                multiline={true}
                styles={styles.attendeeInput} />
              <TouchableOpacity style={styles.addAttendee} onPress={addAttendee}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {validationError.email !== "" && <Text style={styles.error}>{validationError.email}</Text>}
          </View>
          <View style={styles.attendeesList}>
            {
              attendeesList.map((attendee, index) =>
                <View style={styles.attendee} key={index}>
                  <Text style={styles.attendeeText}>{attendee?.email}</Text>
                  <TouchableOpacity onPress={() => handleRemoveAttendee(index)} style={styles.removeAttendee}>
                    <Text style={styles.removeAttendeeText}>X</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          <Text style={{ marginVertical: 20, fontSize: 14 }}>Time Slot</Text>
          <View style={styles.list}>
            {options.timeSlots.map((item, index) => (
              <TouchableOpacity style={[styles.items, {
                backgroundColor: (timeSlot === item ? "#000" : "#FFF")
              }]} onPress={() => selectTimeSlot(item)} key={index}>
                <Text style={{
                  color: (timeSlot === item ? "#FFF" : "#000")
                }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.button}>
            <Button disabled={!!((!title || attendeesList.length === 0))} onPress={pressHandler}>Create Appointment</Button>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { height: "100%", padding: 10 },
  head: { display: "flex", flexDirection: "row", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 17, borderColor: "#F0F2F7", borderBottomWidth: 1, borderTopWidth: 1 },
  headItems: { display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  headerComponents: { fontSize: 22, color: "#313633" },
  headerText: { fontSize: 14, color: "#7C7C7C", marginTop: 8 },
  mt15: { marginTop: 15 },
  mb10: { marginBottom: 10, fontSize: 14, marginLeft: 10 },
  items: { borderWidth: 1, borderRadius: 10, borderColor: "#D8D8D8", width: 90, height: 30, margin: 7, justifyContent: "center", alignItems: "center" },
  list: { display: "flex", flexDirection: "row", flexWrap: "wrap" },
  button: { padding: 15 },
  addAttendee: { backgroundColor: "#000", paddingHorizontal: 25, height: 55, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: 7, borderBottomRightRadius: 7 },
  buttonText: { color: "#fff", alignSelf: "center" },
  attendeeInput: { width: "80%", borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  attendee: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 5 },
  attendeeText: { paddingVertical: 5, backgroundColor: "#F5F5F5", paddingHorizontal: 10, marginRight: 5, borderRadius: 7 },
  attendeeContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
  attendeesList: { marginTop: 10 },
  error: { color: "#f77474", fontStyle: "italic", fontSize: 12, paddingLeft: 10, paddingTop: 5 },
  removeAttendee: { backgroundColor: "red", padding: 4, paddingHorizontal: 10, borderRadius: 4 },
  removeAttendeeText: { color: "white", fontWeight: "bold" }
});
export default CreateAppointment;
