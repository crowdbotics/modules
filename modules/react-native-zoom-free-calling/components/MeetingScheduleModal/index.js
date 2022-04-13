import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Modal, Pressable, SectionList } from "react-native";
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
import options from '../../options'
import Video from '../Video';
import MeetingID from '../MeetingId';
import RecurringMeeting from '../RecurringMeeting';
import MeetingTime from '../MeetingTime';
import Actions from '../Actions';

const MeetingScheduleModal = (props) => {
  const [meetingSchedule, setMeetingSchedule] = useState(options.initialMeetingSchedule);
  const [errors, setErrors] = useState({
    topic: '',
  })
  const [openStartDate, setOpenStartDate] = useState(false)
  const [openEndDate, setOpenEndDate] = useState(false)
  const [openTimezone, setOpenTimezone] = useState(false);
  const [openOccurrences, setOccurrences] = useState(false);
  const [openRecurrenceType, setOpenRecurrenceType] = useState(false);
  const [openRepeatEvery, setOpenRepeatEvery] = useState(false);
  const [openOccursOn, setOpenOccursOn] = useState(false);
  const [openWeeks, setOpenWeeks] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [timezoneList, setTimezoneList] = useState(timezones);
  const [recurrenceList, setRecurrenceList] = useState(options.initialRecurrenceList)
  const [repeatEveryList, setRepeatEveryList] = useState([])
  const [occursOnList, setOccursOnList] = useState([])
  const [occurrencesList, setOccurrencesList] = useState(options.initialOccurrencesList)
  const [weeklyList, setWeeklyList] = useState(options.initialWeeklyList)
  const [weeksList, setWeeksList] = useState(options.initialWeeksList)
  const [daysList, setDaysList] = useState(options.initialDaysList)
  useEffect(() => {
    let tmpRepeatEveryList = []
    if (meetingSchedule.recurrence.recurrence_type == "1")
      for (let i = 0; i < options.recurrentMeeting.daily; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
      }
    else if (meetingSchedule.recurrence.recurrence_type == "2")
      for (let i = 0; i < options.recurrentMeeting.weekly; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
      }
    else if (meetingSchedule.recurrence.recurrence_type == "3")
      for (let i = 0; i < options.recurrentMeeting.monthly; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
      }
    setRepeatEveryList(tmpRepeatEveryList)
  }, [meetingSchedule.recurrence.recurrence_type])

  useEffect(() => {
    let tmpOccursOnList = []
    for (let i = 0; i < 31; i++) {
      tmpOccursOnList.push({ label: (i + 1).toString(), value: (i + 1).toString() })
    }
    setOccursOnList(tmpOccursOnList)
  }, [])

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
    setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, weekly_days: weekly_days.toString() } })
  }

  const meetingTopic = () => {
    return (
      <View style={styles.Mt10}>
        <Input
          label="Meeting topic"
          errorMessage={(errors.topic != "") ? "This field is required." : ""}
          onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, topic: text })}
        />
      </View>
    );
  }

  const recurringMeeting = () => {
    return (
      <Fragment>
        <View style={styles.Dflex}>
          <CheckBox
            tintColors={{ true: '#24ebde', false: 'lightgray' }}
            value={meetingSchedule.recurring_meeting}
            onValueChange={(newValue) => setMeetingSchedule({ ...meetingSchedule, recurring_meeting: newValue })}
          />
          <Text style={styles.Mt7}>Recurring meeting</Text>
        </View>
        {meetingSchedule.recurring_meeting && <>
          <View style={styles.FlexCenter}>
            <View style={styles.Wp25}>
              <Text style={styles.RecurrenceText}>Recurrence</Text>
            </View>
            <View style={styles.Wp70}>
              <DropDownPicker
                zIndex={20}
                placeholderStyle={styles.DropDownPlaceholder}
                style={styles.DropDownPicker}
                open={openRecurrenceType}
                value={meetingSchedule.recurrence.recurrence_type}
                items={recurrenceList}
                setOpen={setOpenRecurrenceType}
                setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, recurrence_type: value() } })}
                setItems={setRecurrenceList}
              />
            </View>
          </View>
          {meetingSchedule.recurrence.recurrence_type != '-1' &&
            <View style={styles.RecurrenceArea}>
              <View style={styles.Wp30}>
                <Text style={styles.RepeatText}>Repeat every</Text>
              </View>
              <View style={styles.Wp30}>
                <DropDownPicker
                  zIndex={19}
                  placeholderStyle={styles.DropDownPlaceholder}
                  style={styles.DropDownPicker}
                  open={openRepeatEvery}
                  value={meetingSchedule.recurrence.repeatEvery}
                  items={repeatEveryList}
                  setOpen={setOpenRepeatEvery}
                  setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, repeatEvery: value() } })}
                  setItems={setRepeatEveryList}
                />
              </View>
              <Text style={styles.Ml5}>{meetingSchedule.recurrence.recurrence_type == '2' ? "Week" : "day"}</Text>
            </View>
          }


          {meetingSchedule.recurrence.recurrence_type == '2' &&
            <View style={styles.RecurrenceArea}>
              <View>
                <Text style={styles.RepeatText}>Occurs on</Text>
              </View>
              <View style={styles.MeetingTypeTwoOccurs}>
                {
                  weeklyList.map((week, index) => (
                    <View style={styles.DalignItem} key={index}>
                      <CheckBox
                        tintColors={options.checkboxColor}
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

          {meetingSchedule.recurrence.recurrence_type == '3' &&
            <View style={styles.RecurrenceArea}>
              <View>
                <Text style={styles.RepeatText}>Occurs on</Text>
              </View>
              <View>
                <View style={styles.MeetingTypeThreeOccurs}>
                  <RadioButton
                    value="true"
                    status={meetingSchedule.recurrence.isDayMonthly ? 'checked' : 'unchecked'}
                    onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isDayMonthly: true } })}
                  />
                  <Text>Day </Text>
                  <View style={styles.Wp30}>
                    <DropDownPicker
                      zIndex={18}
                      placeholderStyle={styles.DropDownPlaceholder}
                      style={styles.DropDownPicker}
                      open={openOccursOn}
                      value={meetingSchedule.recurrence.dayOfMonth}
                      items={occursOnList}
                      setOpen={setOpenOccursOn}
                      setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, dayOfMonth: value() } })}
                      setItems={setOccursOnList}
                    />
                  </View>
                  <Text> of the month</Text>
                </View>
                <View style={styles.MeetingTypeThreeOccurs}>
                  <RadioButton
                    value="false"
                    status={!meetingSchedule.recurrence.isDayMonthly ? 'checked' : 'unchecked'}
                    onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isDayMonthly: false } })}
                  />
                  <View style={styles.DropDownContainer}>
                    <DropDownPicker
                      zIndex={17}
                      disabled={meetingSchedule.recurrence.isDayMonthly}
                      placeholderStyle={styles.DropDownPlaceholder}
                      style={styles.DropDownPicker}
                      open={openWeeks}
                      value={meetingSchedule.recurrence.week}
                      items={weeksList}
                      setOpen={setOpenWeeks}
                      setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, week: value() } })}
                      setItems={setWeeksList}
                    />
                  </View>
                  <View style={styles.Wp40}>
                    <DropDownPicker
                      zIndex={16}
                      disabled={meetingSchedule.recurrence.isDayMonthly}
                      placeholderStyle={styles.DropDownPlaceholder}
                      style={styles.DropDownPicker}
                      open={openDays}
                      value={meetingSchedule.recurrence.day}
                      items={daysList}
                      setOpen={setOpenDays}
                      setValue={(value) => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, day: value() } })}
                      setItems={setDaysList}
                    />
                  </View>
                </View>
              </View>
            </View>
          }
          {meetingSchedule.recurrence.recurrence_type != '-1' && <>
            <View style={styles.Mt8}>
              <Text style={styles.EndText}>End date</Text>
            </View>
            <View style={styles.FlexCenter}>
              <View style={styles.EndDateText}>
                <View>
                  <RadioButton
                    value="true"
                    status={meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                    onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isBy: true } })}
                  />
                </View>
                <View>
                  <Pressable style={styles.FlexCenter} onPress={() => setOpenEndDate(true)}>
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

              <View style={[styles.RadioButtonArea, styles.Mt10]}>
                <View>
                  <RadioButton
                    value="false"
                    status={!meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                    onPress={() => setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, isBy: false } })}
                  />
                </View>
                <View>
                  <View style={styles.DisplayWidth}>
                    <Text>After </Text>
                    <DropDownPicker
                      zIndex={15}
                      disabled={meetingSchedule.recurrence.isBy}
                      placeholder='After'
                      placeholderStyle={styles.DropDownPlaceholder}
                      style={styles.DropDownPicker}
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

        </>}
      </Fragment>
    )
  }

  const DATA = [
    {
      data: [meetingTopic(),
      <MeetingTime meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} setOpenStartDate={setOpenStartDate} openStartDate={openStartDate} openTimezone={openTimezone} setOpenTimezone={setOpenTimezone} timezoneList={timezoneList} setTimezoneList={setTimezoneList} />,
      recurringMeeting(),
      <MeetingID meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
      <Video meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
      <Actions handleSave={handleSave} setModalVisible={props.setModalVisible} />]
    }
  ];

  return (
    <Modal
      presentationStyle='overFullScreen'
      animationType="slide"
      transparent={true}
      visible={true}
    >
      <View style={styles.modalView}>
        <Text style={styles.heading}>Schedule Meeting</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <>{item}</>}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginBottom: 40,
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
  FlexCenter: {
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
  DropDownPlaceholder: {
    color: "lightgrey"
  },
  DropDownPicker: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 4,
    marginTop: 5,
    height: 39,
  },
  VideoMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -5
  },
  VideoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5
  },
  ActionsMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20
  },
  MeetingTypeTwoOccurs: {
    justifyContent: "space-evenly",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  MeetingTypeThreeOccurs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  DropDownContainer: {
    width: '32%',
    marginRight: 5
  },
  DisplayWidth: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  Mt8: {
    marginTop: 8
  },
  Mt10: {
    marginTop: 10
  },
  FwBold: {
    fontWeight: 'bold'
  },
  Dflex: {
    display: "flex",
    flexDirection: "row"
  },
  DalignItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Mt7: {
    marginTop: 7
  },
  Mt5: {
    marginTop: 5
  },
  W100: {
    width: 100
  },
  Wp25: {
    width: '25%'
  },
  Wp70: {
    width: '70%'
  },
  Wp40: {
    width: '40%'
  },
  Wp30: {
    width: '30%'
  },
  Ml5: {
    marginLeft: 5
  }

});

export default MeetingScheduleModal