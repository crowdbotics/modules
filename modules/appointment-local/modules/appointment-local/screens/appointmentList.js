import React, {  useState,useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList,Modal } from 'react-native';
// @ts-ignore
import CalendarStrip from 'react-native-calendar-strip'
import { getAppointment } from '../api';
import Loader from '../components/Loader';
import { useFocusEffect } from '@react-navigation/native';


const Appointment = ({ navigation }) => {
  const [appointmentList, setAppointmentList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalItem, setModalItem] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [filterDate, setFilterDate] =useState('')

  useFocusEffect(
    useCallback(()=>{
      setIsLoading(true)
      getAppointment().then(res => res.json()).then(res => {
        setAppointmentList(res)
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
    },[])
  )
  const modalHandler = (item) => {
    setModalItem(item)
    setModalVisible(true)
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>modalHandler(item)}>
      <View style={styles.appointmentItem}>
        <Text style={{ fontSize: 14, color: '#1E2022' }}>{item.time_slot}</Text>
        <View style={[styles.card, { backgroundColor: '#DADADA' }]}>
          <Text style={{ fontSize: 16 }}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const dateFunc = (date) =>{
      const year=date.getFullYear()
      const selectDate=date.getDate()
      const month=date.getMonth()
  
      setFilterDate(`${year}-${month+1}-${selectDate}`)
      // console.log(filterDate)
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={{ marginTop: 20, marginLeft: 14 }}>
        <Text style={{ fontSize: 14, color: '#1E2022' }}>Calendar</Text>
      </View>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: '#E6E6E6' }}
        style={{ height: 100, paddingBottom: 10 }}
        calendarHeaderStyle={{ color: 'white' }}
        calendarColor={'white'}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        highlightDateNumberStyle={{ color: 'black' }}
        highlightDateNameStyle={{ color: 'black' }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
        onDateSelected={(date)=>dateFunc(new Date(date))}
      />
      <View>
        <View style={styles.viewAll}>
          <Text style={{ fontSize: 14, color: '#1E2022' }}>List of Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <Text style={{ fontSize: 14, color: '#1E2022' }}>View all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={appointmentList.length && appointmentList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Text styles={styles.modalText}>Title:{modalItem.title}</Text>
          <Text styles={styles.modalText}>Location:{modalItem.location}</Text>
          <Text styles={styles.modalText}>Duration{modalItem.duration}</Text>
          <Text styles={styles.modalText}>Description:{modalItem.description}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.hide}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )

};
const styles = StyleSheet.create({

  container: { padding: 10, height: '100%', width: '100%' },
  viewAll: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 14 },
  appointmentItem: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 },
  card: { backgroundColor: '#DADADA', borderRadius: 10, width: '80%', height: 50, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 },
  modalContainer: { height: '40%', width: "70%", alignSelf: 'center', backgroundColor: '#DADADA', display: 'flex', justifyContent: 'center', marginTop: '40%', borderRadius: 10, padding: 10 },
  hide: { marginTop: '30%', alignSelf: 'center' },
  modalText: { fontWeight: 'bold', fontSize: 16 }
})
export default Appointment;