import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
// @ts-ignore
import CalendarStrip  from 'react-native-calendar-strip'
import { dummyAppointments } from '../utils';


const Appointment = () => {

  const renderItem = ({ item }) => (
    // <Item title={item.title} />
    <View style={styles.appointmentItem}>
      <Text>{item.time}</Text>
      <View style={styles.card}>
        <Text >{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.pt10}>
      <View>
        <Text>Calendar</Text>
      </View>
      <CalendarStrip
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{type: 'background', duration: 200,highlightColor:'#E6E6E6'}}
        style={{height: 100, paddingBottom: 10}}
        calendarHeaderStyle={{color: 'white'}}
        calendarColor={'white'}
        dateNumberStyle={{color: 'black'}}
        dateNameStyle={{color: 'black'}}
        highlightDateNumberStyle={{color: 'black'}}
        highlightDateNameStyle={{color: 'black'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
      />
      <View>
        <View style={styles.viewAll}>
          <Text>List of appointments</Text>
          <TouchableOpacity>
            <Text>View all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
      data={dummyAppointments}
      renderItem={renderItem}
      keyExtractor={item => item.time}
      />
    </View>
  )

};
const styles = StyleSheet.create({
 
  pt10:{padding:10, backgroundColor:'white',height:'100%',width:'100%'},
  viewAll: {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:10},
  appointmentItem:{display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center', marginVertical:20},
  card:{backgroundColor: '#DADADA', borderRadius: 10, width:300, height:50, textAlign:'center', display:'flex', justifyContent:'center',alignItems:'center', padding:10},
 

})
export default Appointment;