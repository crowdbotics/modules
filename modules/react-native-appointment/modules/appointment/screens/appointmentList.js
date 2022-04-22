import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,FlatList } from 'react-native';
// @ts-ignore
import CalendarStrip  from 'react-native-calendar-strip'
import { dummyAppointments } from '../utils';


const Appointment = ({navigation}) => {

  const renderItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={{fontSize: 14, color: '#1E2022'}}>{item.time}</Text>
      <View style={[styles.card, { backgroundColor: item.color}]}>
        <Text style={{fontSize: 16}}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: 20, marginLeft: 14}}>
        <Text style={{fontSize: 14, color: '#1E2022'}}>Calendar</Text>
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
          <Text style={{fontSize: 14, color: '#1E2022'}}>List of Appointments</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Appointments')}>
            <Text style={{fontSize: 14, color: '#1E2022'}}>View all</Text>
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
 
  container:{padding:10,height:'100%',width:'100%'},
  viewAll: {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 20, marginHorizontal: 14},
  appointmentItem:{display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center', marginVertical:20},
  card:{backgroundColor: '#DADADA', borderRadius: 10, width: '80%', height:50, textAlign:'center', display:'flex', justifyContent:'center',alignItems:'center', padding:10},
  

})
export default Appointment;