import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { CalendarList } from "react-native-calendars";
import { OptionsContext } from "@options";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/Button";
import { appointmentDurations, timeSlots } from "../utils";

/**
 * Component to display a calendar with time slots and a duration picker.
 * Allows users to select a date, time slot, and duration for an appointment.
 * @param {Object} navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} - The rendered Calendar component.
 */
const Calendar = ({ navigation }) => {
  const { styles } = useContext(OptionsContext);
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState("00:30:00");
  const [markedDates, setMarkedDates] = useState({
    selectedDate: null,
    markedDates: {
      [today.toDateString()]: {
        selected: true,
        color: "#00B0BF",
        textColor: "#FFFFFF"
      }
    }
  });
  const [timeSlot, setTimeSlot] = useState(null);

  // Function to update the selected date when a day is pressed in the calendar.
  const selectDay = (day) => {
    const markedDates = {};
    markedDates[day.dateString] = {
      selected: true,
      selectedColor: "#000"
    };
    setMarkedDates({
      selectedDate: day.dateString,
      markedDates: markedDates
    });
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
            onDayPress={selectDay}
            markedDates={markedDates.markedDates}
          />
          <Text style={styles.timeSlot}>Time Slot</Text>
          <View style={styles.timeSlotList}>
            {useMemo(() => {
              return timeSlots.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.slotItems,
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
              items={appointmentDurations}
              setOpen={setOpen}
              setValue={setDuration}
              style={styles.durationDropdown}
            />
          </View>
          <View style={styles.nextButton}>
            <Button
              // Disable the button if either the time slot or date is not selected.
              disabled={!!(!timeSlot || !markedDates.selectedDate)}
              onPress={() =>
                navigation.navigate("AppointmentForm", {
                  duration: duration,
                  timeSlot: timeSlot,
                  selectedDate: markedDates.selectedDate
                })
              }
            >
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;
