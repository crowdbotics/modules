import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Input from '../components/InputText';
// @ts-ignore
import DropDownPicker from 'react-native-dropdown-picker';
import { dummyTimeSlots } from '../utils';
import Button from '../components/Button';

const CreateAppointment = ({ route, navigation }) => {
  const { duration, selectedDate } = route.params;
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState(route.params.timeSlot)
  const [value, setValue] = useState('daily');
  const [items, setItems] = useState([
    { label: 'Weekly', value: 'weekly' },
    { label: 'Biweekly', value: 'biweekly' },
    { label: 'Daily', value: 'daily' },
    { label: 'Monthly', value: 'monthly' },
  ])

  console.log(duration, timeSlot, selectedDate)

  const selectTimeSlot = (item) => {
    setTimeSlot(item)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.headItems}>
              <Text style={{ fontSize: 22, color: '#313633' }}>{selectedDate}</Text>
              <Text style={{ fontSize: 14, color: '#7C7C7C', marginTop: 8 }}>Appointment date</Text>
            </View>
            <View style={styles.headItems}>
              <Text style={{ fontSize: 22, color: '#313633' }}>{timeSlot}</Text>
              <Text style={{ fontSize: 14, color: '#7C7C7C', marginTop: 8 }}>Time</Text>
            </View >
            <View style={styles.headItems}>
              <Text style={{ fontSize: 22, color: '#313633' }}>{duration} Hour</Text>
              <Text style={{ fontSize: 14, color: '#7C7C7C', marginTop: 8 }}>Duration</Text>
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
            <Text style={styles.mb10}>Select Reminder</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderColor: '#C4C4C4',
                height: 53
              }}
            />
          </View>
          <Text style={{ marginVertical: 20, fontSize: 14 }}>Time Slot</Text>
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
          <View style={styles.button}>
            <Button>Create Appointment</Button>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )

};
const styles = StyleSheet.create({
  container: { height: '100%', padding: 10 },
  head: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 17, borderColor: '#F0F2F7', borderBottomWidth: 1, borderTopWidth: 1 },
  headItems: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  mt15: { marginTop: 15 },
  mb10: { marginBottom: 10, fontSize: 14, marginLeft: 10 },
  items: { borderWidth: 1, borderRadius: 10, borderColor: '#D8D8D8', width: 90, height: 30, margin: 7, justifyContent: 'center', alignItems: 'center' },
  list: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
  button: { padding: 15 }

})
export default CreateAppointment