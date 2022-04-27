import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { CalendarList } from 'react-native-calendars';
import { dummyTimeSlots } from '../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';

const Calendar = ({ navigation }) => {
  const today = new Date()
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState('0.5');
  const [markedDates, setMarkedDates] = useState({
    selectedDate: today.toDateString(),
    markedDates: {
      [today.toDateString()]: { selected: true, color: '#00B0BF', textColor: '#FFFFFF' }
    }
  })
  const [timeSlot, setTimeSlot] = useState('')
  const [items, setItems] = useState([
    { label: '30 min', value: '0.5' },
    { label: '1 hour', value: '1' },
    { label: '1 hour 30 min', value: '1.5' },
    { label: '2 hour', value: '2' },
    { label: '2 hour 30 min', value: '2.5' },
    { label: '3 hour', value: '3' },
  ])

  const daySelector = (day) => {
    let markedDates = {};
    markedDates[day.dateString] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    setMarkedDates({
      selectedDate: day.dateString,
      markedDates: markedDates
    });
  }

  const selectTimeSlot = (item) => {
    setTimeSlot(item)
  }


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
            {dummyTimeSlots.map((item, index) => (
              <TouchableOpacity style={[styles.items, {
                backgroundColor: (timeSlot == item ? "#00B0BF" : "#FFF")
              }]} onPress={() => selectTimeSlot(item)} key={index}>
                <Text style={{
                  color: (timeSlot == item ? "#FFF" : "#000")
                }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
            <DropDownPicker
              open={open}
              value={duration}
              items={items}
              setOpen={setOpen}
              setValue={setDuration}
              setItems={setItems}
              style={{
                borderColor: '#C4C4C4',
                height: 53
              }}
            />
          </View>
          <View style={styles.button}>
            <Button onPress={() => navigation.navigate('AppointmentForm', {
              duration: duration,
              timeSlot: timeSlot,
              selectedDate: markedDates.selectedDate
            })}>Next</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  items: { borderWidth: 1, borderRadius: 10, borderColor: '#D8D8D8', width: 90, height: 30, margin: 7, justifyContent: 'center', alignItems: 'center' },
  list: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  mt15: { marginTop: 15 },
  mb10: { marginBottom: 10, fontSize: 14, marginLeft: 10 },
  button: { padding: 30 },
  ph10: { paddingHorizontal: 15 },
  timeSlot: { marginVertical: 10, fontSize: 14, marginLeft: 10 }
})
export default Calendar