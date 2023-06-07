import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { CalendarList } from "react-native-calendars";
import { OptionsContext } from "@options";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/Button";

const Calendar = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState("00:30:00");
  const [markedDates, setMarkedDates] = useState({
    selectedDate: today.toDateString(),
    markedDates: {
      [today.toDateString()]: { selected: true, color: "#00B0BF", textColor: "#FFFFFF" }
    }
  });
  const [timeSlot, setTimeSlot] = useState("");
  const [items, setItems] = useState([
    { label: "30 min", value: "00:30:00" },
    { label: "1 hour", value: "01:00:00" },
    { label: "1 hour 30 min", value: "01:30:00" },
    { label: "2 hour", value: "02:00:00" },
    { label: "2 hour 30 min", value: "02.30:00" },
    { label: "3 hour", value: "03:00:00" }
  ]);

  const daySelector = (day) => {
    const markedDates = {};
    markedDates[day.dateString] = { selected: true, selectedColor: "#000" };
    setMarkedDates({
      selectedDate: day.dateString,
      markedDates: markedDates
    });
  };

  const selectTimeSlot = (item) => {
    setTimeSlot(item);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.ph10}>
          <CalendarList
            minDate={today.toDateString()}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={370}
            onDayPress={daySelector}
            markedDates={markedDates.markedDates}

          />
          <Text style={styles.timeSlot}>Time Slot</Text>
          <View style={styles.list}>
            { options.timeSlots.map((item, index) => (
              <TouchableOpacity style={[styles.items, {
                backgroundColor: (timeSlot === item ? "#000" : "#FFF")
              }]} onPress={() => selectTimeSlot(item)} key={index}>
                <Text style={{
                  color: (timeSlot === item ? "#FFF" : "#000")
                }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Duration</Text>
            <DropDownPicker
              open={open}
              value={duration}
              items={items}
              setOpen={setOpen}
              setValue={setDuration}
              setItems={setItems}
              style={styles.dropdown}
            />
          </View>
          <View style={styles.button}>
            <Button onPress={() => navigation.navigate("AppointmentForm", {
              duration: duration,
              timeSlot: timeSlot,
              selectedDate: markedDates.selectedDate
            })}>Next</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mt15: {
    marginTop: 15
  },
  mb10: {
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 10
  },
  button: {
    padding: 30
  },
  ph10: {
    paddingHorizontal: 15
  },
  timeSlot: {
    marginVertical: 10,
    fontSize: 14,
    marginLeft: 10
  },
  dropdown: {
    borderColor: "#C4C4C4",
    height: 53
  }
});
export default Calendar;
