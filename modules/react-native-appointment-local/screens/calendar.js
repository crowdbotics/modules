import React, { useState, useContext, useRef, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { CalendarList } from "react-native-calendars";
import { OptionsContext } from "@options";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/Button";
import { availableTimeSlots, timeSlots } from "../utils";

const Calendar = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const today = useRef(new Date());
  // Open state for duration dropdown
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState("00:30:00");
  // Marked dates on calendar
  const [markedDates, setMarkedDates] = useState({
    selectedDate: today.current.toDateString(),
    markedDates: {
      [today.current.toDateString()]: {
        selected: true,
        color: "#00B0BF",
        textColor: "#FFFFFF"
      }
    }
  });
  const [timeSlot, setTimeSlot] = useState("");
  const [items, setItems] = useState(availableTimeSlots);

  const daySelector = (day) => {
    const markedDates = {};
    markedDates[day.dateString] = { selected: true, selectedColor: "#000" };
    setMarkedDates({
      selectedDate: day.dateString,
      markedDates: markedDates
    });
  };

  const navigateToScreen = () => {
    if (timeSlot) {
      navigation.navigate("AppointmentForm", {
        duration: duration,
        timeSlot: timeSlot,
        selectedDate: markedDates.selectedDate
      });
    } else {
      Alert.alert("Error", "Please select a time slot");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.ph10}>
          <CalendarList
            minDate={today.current.toDateString()}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth={370}
            onDayPress={daySelector}
            markedDates={markedDates.markedDates}
          />
          <Text style={styles.timeSlot}>Time Slot</Text>
          <View style={styles.list}>
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
          <View style={styles.NextButton}>
            <Button onPress={navigateToScreen}>Next</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;
