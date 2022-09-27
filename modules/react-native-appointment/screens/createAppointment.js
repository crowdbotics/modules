import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Input from "../components/InputText";
// @ts-ignore
import { OptionsContext } from "@options";
import Button from "../components/Button";
import { createAppointment } from "../api";
import Loader from "../components/Loader";
import moment from "moment";
// @ts-ignore
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const CreateAppointment = ({ route, navigation }) => {
  const options = useContext(OptionsContext);
  const { duration, selectedDate } = route.params;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState(route.params.timeSlot);
  const [isLoading, setIsLoading] = useState(false);

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
      }
    })
      .then(() => {
        setIsLoading(false);
        navigation.replace("Home");
      }).catch(e => console.log(e));
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
            <Button onPress={pressHandler}>Create Appointment</Button>
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
  button: { padding: 15 }

});
export default CreateAppointment;
