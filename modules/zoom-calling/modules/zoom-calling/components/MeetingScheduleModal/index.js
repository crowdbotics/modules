import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable } from "react-native";
import Input from '../Input';
// @ts-ignore
import { RadioButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
// @ts-ignore
import DropDownPicker from 'react-native-dropdown-picker';
// @ts-ignore
import DatePicker from 'react-native-date-picker'
import { timezones } from '../../timezones';
// @ts-ignore
import CheckBox from '@react-native-community/checkbox';

const MeetingScheduleModal = (props) => {
  const [meetingSchedule, setMeetingSchedule] = useState({
    topic: '',
    startDate: new Date(),
    timezone: 'America/Los_Angeles',
    meetingID: false,
    hostVideo: true,
    participantsVideo: true,
    recurring_meeting: false,
    recurrence: {
      recurrence_type: "1",
      repeatEvery: '1',
      endDate: new Date(),
      occurrences: '7',
      isBy: true,
      weekly_days: "1"
    }
  });
  const [errors, setErrors] = useState({
    topic: '',
  })
  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [openTimezone, setOpenTimezone] = useState(false);
  const [openOccurrences, setOccurrences] = useState(false);
  const [openRecurrenceType, setOpenRecurrenceType] = useState(false);
  const [openRepeatEvery, setOpenRepeatEvery] = useState(false);
  const [timezoneList, setTimezoneList] = useState(timezones);
  const [recurrenceList, setRecurrenceList] = useState([{
    label: "Daily",
    value: "1"
  }, {
    label: "Weekly",
    value: "2"
  }, {
    label: "Monthly",
    value: "3"
  }, {
    label: "No Fixed Time",
    value: "0"
  }])
  const [repeatEveryList, setRepeatEveryList] = useState([])
  const [occurrencesList, setOccurrencesList] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" }
  ])
  const [weeklyList, setWeeklyList] = useState([{
    label: "Sun",
    value: "1",
    isSelected: true
  }, {
    label: "Mon",
    value: "2",
    isSelected: false
  }, {
    label: "Tue",
    value: "3",
    isSelected: false
  }, {
    label: "Wed",
    value: "4",
    isSelected: false
  }, {
    label: "Thu",
    value: "5",
    isSelected: false
  }, {
    label: "Fri",
    value: "6",
    isSelected: false
  }, {
    label: "Sat",
    value: "7",
    isSelected: false
  }])

  useEffect(() => {
    let tmpRepeatEveryList = []
    if (meetingSchedule.recurrence.recurrence_type == "1")
      for (let i = 0; i < 15; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
      }
    else
      for (let i = 0; i < 12; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
      }
    setRepeatEveryList(tmpRepeatEveryList)
  }, [meetingSchedule.recurrence.recurrence_type])
  

  const handleSave = () => {
    if (meetingSchedule.topic == "") {
      setErrors({ ...errors, topic: "This field is required." })
      return
    }
    props.onHandleMeetingSchedule(meetingSchedule)
  }

  const handleWeeklyCheckbox = (weekIndex) => {
    let tmpWeeklyList = JSON.parse(JSON.stringify(weeklyList))
    tmpWeeklyList[weekIndex].isSelected = !tmpWeeklyList[weekIndex].isSelected
    setWeeklyList(tmpWeeklyList)
    let weekly_days = tmpWeeklyList.filter(obj => obj.isSelected).map(obj => obj.value)
    setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, weekly_days: weekly_days.toString()}})
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
            <View style={{ display: "flex", flexDirection: "row" }}>
              <CheckBox
                tintColors={{ true: '#24ebde', false: 'lightgray' }}
                value={meetingSchedule.recurring_meeting}
                onValueChange={(newValue) => setMeetingSchedule({ ...meetingSchedule, recurring_meeting: newValue })}
              />
              <Text style={{ marginTop: 7 }}>Recurring meeting</Text>
            </View>
            {meetingSchedule.recurring_meeting && <>
              <View style={styles.MeetingRecurrence}>
                <View style={{ width: '25%' }}>
                  <Text style={styles.RecurrenceText}>Recurrence</Text>
                </View>
                <View style={{ width: '70%' }}>
                  <DropDownPicker
                    placeholder='Recurrence'
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
                    zIndex={9999}
                    open={openRecurrenceType}
                    value={meetingSchedule.recurrence.recurrence_type}
                    items={recurrenceList}
                    setOpen={setOpenRecurrenceType}
                    setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, recurrence_type: value() } })}
                    setItems={setRecurrenceList}
                  />
                </View>
              </View>
              <View style={styles.RecurrenceArea}>
                <View style={{ width: '30%' }}>
                  <Text style={styles.RepeatText}>Repeat every</Text>
                </View>
                <View style={{ width: '30%' }}>
                  <DropDownPicker
                    placeholder='Day'
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
                    open={openRepeatEvery}
                    value={meetingSchedule.recurrence.repeatEvery}
                    items={repeatEveryList}
                    setOpen={setOpenRepeatEvery}
                    setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, repeatEvery: value() } })}
                    setItems={setRepeatEveryList}
                  />
                </View>
                <Text style={{ marginLeft: 5 }}>{meetingSchedule.recurrence.recurrence_type == '2' ? "Week": "day"}</Text>
              </View>

              {meetingSchedule.recurrence.recurrence_type == '2' &&
                <View style={styles.RecurrenceArea}>
                  <View>
                    <Text style={styles.RepeatText}>Occurs on</Text>
                  </View>
                  <View style={{ justifyContent: "space-evenly", display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5, }}>
                    {
                      weeklyList.map((week, index) => (
                        <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={index}>
                          <CheckBox
                            tintColors={{ true: '#24ebde', false: 'lightgray' }}
                            value={week.isSelected}
                            onValueChange={() => handleWeeklyCheckbox(index)}
                          />
                          <Text>{week.label}</Text>
                        </View>
                      ))
                    }
                  </View>
                </View>
              }

              <View style={{ marginTop: 8 }}>
                <Text style={styles.EndText}>End date</Text>
              </View>
              <View style={styles.EndDate}>
                <View style={styles.EndDateText}>
                  <View>
                    <RadioButton
                      value="true"
                      status={meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isBy: true } })}
                    />
                  </View>
                  <View>
                    <Pressable style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => setOpenEndDate(true)}>
                      <Text>By </Text>
                      <Input
                        editable={false}
                        value={meetingSchedule.recurrence.endDate.toDateString()}
                      />
                    </Pressable>
                    <DatePicker
                      modal
                      mode={"date"}
                      open={openEndDate}
                      date={meetingSchedule.recurrence.endDate}
                      onConfirm={(date) => {
                        setOpenEndDate(false)
                        setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, endDate: date } })
                      }}
                      onCancel={() => {
                        setOpenEndDate(false)
                      }}
                    />
                  </View>
                </View>

                <View style={styles.RadioButtonArea}>
                  <View>
                    <RadioButton
                      value="false"
                      status={!meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isBy: false } })}
                    />
                  </View>
                  <View>
                    <View style={{ width: '70%', display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <Text>After </Text>
                      <DropDownPicker
                        disabled={meetingSchedule.recurrence.isBy}
                        placeholder='After'
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
                        open={openOccurrences}
                        value={meetingSchedule.recurrence.occurrences}
                        items={occurrencesList}
                        setOpen={setOccurrences}
                        setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, occurrences: value() } })}
                        setItems={setOccurrencesList}
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
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
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
  RecurrenceArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  MeetingRecurrence: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  RecurrenceText: {
    fontSize: 14,
    marginTop: 5,
    paddingRight: 5,
    fontWeight: 'bold',
  },
  RepeatText: {
    fontSize: 14,
    marginTop: 8,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  EndText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  EndDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  EndDateText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%'
  },
  RadioButtonArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    marginLeft: 35
  },
});

export default MeetingScheduleModal