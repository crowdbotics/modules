import React, {useState} from 'react'
import { View, StyleSheet,Text,ScrollView, SafeAreaView ,TouchableHighlight} from 'react-native'
import {CalendarList, Agenda} from 'react-native-calendars';
import { dummyTimeSlots } from '../utils';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';



const Calendar = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('30');
  const [day, selectDay] = useState('')
  const [markedDates,setMarkedDates] = useState({})
  const [timeSlot, setTimeSlot] =useState('')
  const [items, setItems] = useState([
    {label: '30 min', value: '30'},
    {label: '1 hour', value: '60'},
    {label: '1 hour 30 min', value: '90'},
    {label: '2 hour', value: '120'},
    {label: '2 hour 30 min', value: '150'},
    {label: '3 hour', value: '180'},
  ])
  
  const daySelector= (day) => {
    console.log(day)
    selectDay(day)
    setMarkedDates({
      [day.dateString]: {selected: true, marked: true, selectedColor: 'blue'}
    })
  }
  const selectTimeSlot= (item) => {
    console.log(item)
    setTimeSlot(item)
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.ph10}>
          <CalendarList
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            // Set custom calendarWidth.
            calendarWidth={370}
            onDayPress={daySelector}
            
            markedDates={markedDates}

          />
          <Text style={styles.timeSlot}>Time Slot</Text>
          <View style={styles.list}>
            {dummyTimeSlots.map((item,index)=>(
              <TouchableHighlight onPress={()=>selectTimeSlot(item)} key={index}>
                <View style={styles.items} >
                  <Text>{item}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>  
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
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
          <View style={styles.button}>
              <Button onPress={()=>navigation.navigate('AppointmentForm')}>Next</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({ 
  items:{borderWidth:1, borderRadius:10, borderColor:'#D8D8D8', width:90, height:30, margin: 7, justifyContent:'center', alignItems:'center'},
  list:{display:'flex', flexDirection:'row', flexWrap:'wrap'},
  mt15:{marginTop:15},
  mb10: {marginBottom:10, fontSize: 14, marginLeft: 10},
  button:{padding:30},
  ph10:{paddingHorizontal:15},
  timeSlot:{marginVertical: 10, fontSize: 14, marginLeft:10}
})
export default Calendar