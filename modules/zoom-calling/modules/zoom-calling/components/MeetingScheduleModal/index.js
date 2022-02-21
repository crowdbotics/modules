import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from "react-native";
import Input from '../Input';
// @ts-ignore
import { RadioButton, Checkbox } from 'react-native-paper';
import { StyleSheet } from 'react-native';
// @ts-ignore
import DropDownPicker from 'react-native-dropdown-picker';
// @ts-ignore
import DatePicker from 'react-native-date-picker'
import { timezones } from '../../timezones';

const MeetingScheduleModal = (props) => {
  const [meetingSchedule, setMeetingSchedule] = useState({
    topic: '',
    startDate: new Date(),
    timezone: 'America/Los_Angeles',
    meetingID: false,
    hostVideo: true,
    participantsVideo: true,
    recurring_meeting: false
  });
  const [errors, setErrors] = useState({
    topic: '',
  })
  const [openStartDate, setOpenStartDate] = useState(false)
  const [openTimezone, setOpenTimezone] = useState(false);
  const [timezoneList, setTimezoneList] = useState(timezones);

  const handleSave = () => {
    if (meetingSchedule.topic == "") {
      setErrors({ ...errors, topic: "This field is required." })
      return
    }
    props.onHandleMeetingSchedule(meetingSchedule)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        presentationStyle='overFullScreen'
        animationType="slide"
        transparent={true}
        visible={true}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Schedule Meeting</Text>
            <View style={{ marginTop: 10 }}>
              <Input
                label="Meeting topic"
                errorMessage={(errors.topic != "") ? "This field is required." : ""}
                onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, topic: text })}
              />
            </View>
            <View style={styles.ModalContent}>
              <View style={styles.InputLabels}>
                <Pressable onPress={() => setOpenStartDate(true)}>
                  <Input
                    label="When"
                    editable={false}
                    value={meetingSchedule.startDate.toLocaleString('en-US', {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  />
                </Pressable>
                <DatePicker
                  modal
                  open={openStartDate}
                  date={meetingSchedule.startDate}
                  onConfirm={(date) => {
                    setOpenStartDate(false)
                    setMeetingSchedule({ ...meetingSchedule, startDate: date })
                  }}
                  onCancel={() => {
                    setOpenStartDate(false)
                  }}
                />
              </View>
              <View style={styles.InputLabels}>
                <Text style={{ fontWeight: "bold" }}>Timezone</Text>
                <DropDownPicker
                  placeholder='Timezone'
                  placeholderStyle={{
                    color: "lightgrey",
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    height: 39,
                  }}
                  labelProps={{
                    numberOfLines: 1,
                  }}
                  listMode="MODAL"
                  modalTitle="Select timezone"
                  searchable={true}
                  open={openTimezone}
                  value={meetingSchedule.timezone}
                  items={timezoneList}
                  setOpen={setOpenTimezone}
                  setValue={(value) => setMeetingSchedule({ ...meetingSchedule, timezone: value() })}
                  setItems={setTimezoneList}
                />
              </View>
            </View>
            {/* <View style={{display: "flex", flexDirection: "row"}}>
              <Checkbox
                status={meetingSchedule.recurring_meeting ? 'checked' : 'unchecked'}
                onPress={() => setMeetingSchedule({ ...meetingSchedule, recurring_meeting: !meetingSchedule.recurring_meeting })}
              />
              <Text style={{ marginTop: 8 }}>Recurring meeting</Text>
            </View> */}
            {meetingSchedule.recurring_meeting && <>
              <View style={styles.MeetingRecurrence}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.RecurrenceText}>Recurrence</Text>
                </View>
                <View style={{ width: '70%' }}>
                  <DropDownPicker
                    placeholder='Daily'
                    placeholderStyle={{
                      color: "lightgrey",
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "lightgray",
                      borderRadius: 5,
                      padding: 4,
                      marginTop: 5,
                      height: 39,
                    }}
                    labelProps={{
                      numberOfLines: 1,
                    }}
                    listMode="MODAL"
                    modalTitle="Select timezone"
                    searchable={true}
                    open={openTimezone}
                    value={meetingSchedule.timezone}
                    items={timezoneList}
                    setOpen={setOpenTimezone}
                    setValue={(value) => setMeetingSchedule({ ...meetingSchedule, timezone: value() })}
                    setItems={setTimezoneList}
                  />
                </View>
              </View>
              <View style={styles.RecurrenceArea}>
                <View style={{ width: '30%' }}>
                  <Text style={styles.RepeatText}>Repeat every</Text>
                </View>
                <View style={{ width: '30%' }}>
                  <DropDownPicker
                    placeholder='Daily'
                    placeholderStyle={{
                      color: "lightgrey",
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: "lightgray",
                      borderRadius: 5,
                      padding: 4,
                      marginTop: 5,
                      height: 39,
                    }}
                    labelProps={{
                      numberOfLines: 1,
                    }}
                    listMode="MODAL"
                    modalTitle="Select timezone"
                    searchable={true}
                    open={openTimezone}
                    value={meetingSchedule.timezone}
                    items={timezoneList}
                    setOpen={setOpenTimezone}
                    setValue={(value) => setMeetingSchedule({ ...meetingSchedule, timezone: value() })}
                    setItems={setTimezoneList}
                  />
                </View>
                <Text style={{ marginLeft: 5 }}>day</Text>
              </View>
              <View style={{marginTop:8}}>
                <Text style={styles.EndText}>End date</Text>
              </View>
              <View style={styles.EndDate}>
                <View style={styles.EndDateText}>
                  <View>
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.meetingID ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: false })}
                    />
                  </View>
                  <View>
                    <Pressable onPress={() => setOpenStartDate(true)}>
                      <Input
                        editable={false}
                        value={meetingSchedule.startDate.toLocaleString('en-US', {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      />
                    </Pressable>
                    <DatePicker
                      modal
                      open={openStartDate}
                      date={meetingSchedule.startDate}
                      onConfirm={(date) => {
                        setOpenStartDate(false)
                        setMeetingSchedule({ ...meetingSchedule, startDate: date })
                      }}
                      onCancel={() => {
                        setOpenStartDate(false)
                      }}
                    />
                  </View>
                </View>

                <View style={styles.RadioButtonArea}>
                  <View>
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.meetingID ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: false })}
                    />
                  </View>
                  <View>
                    <View style={{ width: '80%' }}>
                      <DropDownPicker
                        placeholder='Daily'
                        placeholderStyle={{
                          color: "lightgrey",
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: "lightgray",
                          borderRadius: 5,
                          padding: 4,
                          height: 39,
                        }}
                        labelProps={{
                          numberOfLines: 1,
                        }}
                        listMode="MODAL"
                        modalTitle="Select timezone"
                        searchable={true}
                        open={openTimezone}
                        value={meetingSchedule.timezone}
                        items={timezoneList}
                        setOpen={setOpenTimezone}
                        setValue={(value) => setMeetingSchedule({ ...meetingSchedule, timezone: value() })}
                        setItems={setTimezoneList}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </>}
            
            <View style={{ marginTop: 5 }}>
              <Text style={styles.MeetingID}>Meeting ID</Text>
              <View style={styles.MeetingRow}>
                <View style={styles.InputsArea}>
                  <View style={styles.RadioButtons}>
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.meetingID ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: false })}
                    />
                    <Text numberOfLines={2} style={{ width: 100 }}>Generate Automatically</Text>
                  </View>
                </View>
                <View style={styles.InputsArea}>
                  <View style={styles.RadioButtons}>
                    <RadioButton
                      value="true"
                      status={meetingSchedule.meetingID ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: true })}
                    />
                    <Text numberOfLines={2} style={{ width: 100 }}>Personal Meeting ID</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.VideoText}>Video</Text>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10, marginTop: -5 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingRight: 5 }}>
                  <Text style={{ marginTop: 8 }}>Host</Text>
                  <View style={{ display: "flex", flexDirection: "row", }}>
                    <RadioButton
                      value="true"
                      status={meetingSchedule.hostVideo ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, hostVideo: true })}
                    />
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.hostVideo ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, hostVideo: false })}
                    />
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingRight: 5 }}>
                  <Text style={{ marginTop: 8 }}>Participants</Text>
                  <View style={{ display: "flex", flexDirection: "row", }}>
                    <RadioButton
                      value="true"
                      status={meetingSchedule.participantsVideo ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, participantsVideo: true })}
                    />
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.participantsVideo ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, participantsVideo: false })}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 40 }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => props.setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSave}
                disabled={props.isMeetingScheduleSave}
              >
                <Text style={styles.textStyle}>{props.isMeetingScheduleSave ? "Saving" : "Save"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 8,
    elevation: 12,
    marginLeft: 10,
    width: 100
  },
  buttonOpen: {
    backgroundColor: "#FA060D",
  },
  buttonClose: {
    backgroundColor: "#2D8CFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 40,
  },
  ModalContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  InputLabels: {
    width: "49%",
  },
  MeetingID: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  MeetingRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  InputsArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    paddingRight: 5,
  },
  RadioButtons: {
    display: "flex",
    flexDirection: "row",
  },
  VideoText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  RecurrenceArea:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center' , 
    marginTop:10,
  },
  MeetingRecurrence:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  RecurrenceText:{
    fontSize: 14, 
    marginTop: 5, 
    paddingRight: 5, 
    fontWeight:'bold',
  },
  RepeatText:{
    fontSize: 14, 
    marginTop: 8, 
    paddingRight: 10, 
    fontWeight:'bold',
  },
  EndText:{
    fontSize: 14, 
    fontWeight: 'bold', 
  },
  EndDate:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  EndDateText:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '40%'
  },
  RadioButtonArea:{
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '40%', 
    marginLeft: 35 
  },
});

export default MeetingScheduleModal