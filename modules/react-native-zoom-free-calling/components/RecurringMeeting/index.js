import React, { Fragment } from 'react'
import { View, StyleSheet, Text, Pressable, } from 'react-native'
// @ts-ignore
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
// @ts-ignore
import DatePicker from 'react-native-date-picker'
// @ts-ignore
import CheckBox from '@react-native-community/checkbox'
import Input from '../Input';
import options from '../../options';


const RecurringMeeting = (props) => {
  return (
    <Fragment>
      <View style={styles.Dflex}>
        <CheckBox
          tintColors={{ true: '#24ebde', false: 'lightgray' }}
          value={props.meetingSchedule.recurring_meeting}
          onValueChange={(newValue) => props.setMeetingSchedule({ ...props.meetingSchedule, recurring_meeting: newValue })}
        />
        <Text style={styles.Mt7}>Recurring meeting</Text>
      </View>
      {props.meetingSchedule.recurring_meeting && <>
        <View style={styles.FlexCenter}>
          <View style={styles.Wp25}>
            <Text style={styles.RecurrenceText}>Recurrence</Text>
          </View>
          <View style={styles.Wp70}>
            <DropDownPicker
              zIndex={20}
              placeholderStyle={styles.DropDownPlaceholder}
              style={styles.DropDownPicker}
              open={props.openRecurrenceType}
              value={props.meetingSchedule.recurrence.recurrence_type}
              items={props.recurrenceList}
              setOpen={props.setOpenRecurrenceType}
              setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, recurrence_type: value() } })}
              setItems={props.setRecurrenceList}
            />
          </View>
        </View>
        {props.meetingSchedule.recurrence.recurrence_type != '-1' &&
          <View style={styles.RecurrenceArea}>
            <View style={styles.Wp30}>
              <Text style={styles.RepeatText}>Repeat every</Text>
            </View>
            <View style={styles.Wp30}>
              <DropDownPicker
                zIndex={19}
                placeholderStyle={styles.DropDownPlaceholder}
                style={styles.DropDownPicker}
                open={props.openRepeatEvery}
                value={props.meetingSchedule.recurrence.repeatEvery}
                items={props.repeatEveryList}
                setOpen={props.setOpenRepeatEvery}
                setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, repeatEvery: value() } })}
                setItems={props.setRepeatEveryList}
              />
            </View>
            <Text style={styles.Ml5}>{props.meetingSchedule.recurrence.recurrence_type == '2' ? "Week" : "day"}</Text>
          </View>
        }


        {props.meetingSchedule.recurrence.recurrence_type == '2' &&
          <View style={styles.RecurrenceArea}>
            <View>
              <Text style={styles.RepeatText}>Occurs on</Text>
            </View>
            <View style={styles.MeetingTypeTwoOccurs}>
              {
                props.weeklyList.map((week, index) => (
                  <View style={styles.DalignItem} key={index}>
                    <CheckBox
                      tintColors={options.checkboxColor}
                      value={week.isSelected}
                      onValueChange={() => props.handleWeeklyCheckbox(index)}
                    />
                    <Text>{week.label}</Text>
                  </View>
                ))
              }
            </View>
          </View>
        }

        {props.meetingSchedule.recurrence.recurrence_type == '3' &&
          <View style={styles.RecurrenceArea}>
            <View>
              <Text style={styles.RepeatText}>Occurs on</Text>
            </View>
            <View>
              <View style={styles.MeetingTypeThreeOccurs}>
                <RadioButton
                  value="true"
                  status={props.meetingSchedule.recurrence.isDayMonthly ? 'checked' : 'unchecked'}
                  onPress={() => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, isDayMonthly: true } })}
                />
                <Text>Day </Text>
                <View style={styles.Wp30}>
                  <DropDownPicker
                    zIndex={18}
                    placeholderStyle={styles.DropDownPlaceholder}
                    style={styles.DropDownPicker}
                    open={props.openOccursOn}
                    value={props.meetingSchedule.recurrence.dayOfMonth}
                    items={props.occursOnList}
                    setOpen={props.setOpenOccursOn}
                    setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, dayOfMonth: value() } })}
                    setItems={props.setOccursOnList}
                  />
                </View>
                <Text> of the month</Text>
              </View>
              <View style={styles.MeetingTypeThreeOccurs}>
                <RadioButton
                  value="false"
                  status={!props.meetingSchedule.recurrence.isDayMonthly ? 'checked' : 'unchecked'}
                  onPress={() => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, isDayMonthly: false } })}
                />
                <View style={styles.DropDownContainer}>
                  <DropDownPicker
                    zIndex={17}
                    disabled={props.meetingSchedule.recurrence.isDayMonthly}
                    placeholderStyle={styles.DropDownPlaceholder}
                    style={styles.DropDownPicker}
                    open={props.openWeeks}
                    value={props.meetingSchedule.recurrence.week}
                    items={props.weeksList}
                    setOpen={props.setOpenWeeks}
                    setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, week: value() } })}
                    setItems={props.setWeeksList}
                  />
                </View>
                <View style={styles.Wp40}>
                  <DropDownPicker
                    zIndex={16}
                    disabled={props.meetingSchedule.recurrence.isDayMonthly}
                    placeholderStyle={styles.DropDownPlaceholder}
                    style={styles.DropDownPicker}
                    open={props.openDays}
                    value={props.meetingSchedule.recurrence.day}
                    items={props.daysList}
                    setOpen={props.setOpenDays}
                    setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, day: value() } })}
                    setItems={props.setDaysList}
                  />
                </View>
              </View>
            </View>
          </View>
        }
        {props.meetingSchedule.recurrence.recurrence_type != '-1' && <>
          <View style={styles.Mt8}>
            <Text style={styles.EndText}>End date</Text>
          </View>
          <View style={styles.FlexCenter}>
            <View style={styles.EndDateText}>
              <View>
                <RadioButton
                  value="true"
                  status={props.meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                  onPress={() => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, isBy: true } })}
                />
              </View>
              <View>
                <Pressable style={styles.FlexCenter} onPress={() => props.setOpenEndDate(true)}>
                  <Text>By </Text>
                  <Input
                    editable={false}
                    value={props.meetingSchedule.recurrence.endDate.toDateString()}
                  />
                </Pressable>
                <DatePicker
                  modal
                  mode={"date"}
                  open={props.openEndDate}
                  date={props.meetingSchedule.recurrence.endDate}
                  onConfirm={(date) => {
                    props.setOpenEndDate(false)
                    props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, endDate: date } })
                  }}
                  onCancel={() => {
                    props.setOpenEndDate(false)
                  }}
                />
              </View>
            </View>

            <View style={[styles.RadioButtonArea, styles.Mt10]}>
              <View>
                <RadioButton
                  value="false"
                  status={!props.meetingSchedule.recurrence.isBy ? 'checked' : 'unchecked'}
                  onPress={() => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, isBy: false } })}
                />
              </View>
              <View>
                <View style={styles.DisplayWidth}>
                  <Text>After </Text>
                  <DropDownPicker
                    zIndex={15}
                    disabled={props.meetingSchedule.recurrence.isBy}
                    placeholder='After'
                    placeholderStyle={styles.DropDownPlaceholder}
                    style={styles.DropDownPicker}
                    open={props.openOccurrences}
                    value={props.meetingSchedule.recurrence.occurrences}
                    items={props.occurrencesList}
                    setOpen={props.setOccurrences}
                    setValue={(value) => props.setMeetingSchedule({ ...props.meetingSchedule, recurrence: { ...props.meetingSchedule.recurrence, occurrences: value() } })}
                    setItems={props.setOccurrencesList}
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

const styles = StyleSheet.create({
  Dflex: {
    display: "flex",
    flexDirection: "row"
  },
  RadioButtons: {
    display: "flex",
    flexDirection: "row",
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
  Mt8: {
    marginTop: 8
  },
  Mt10: {
    marginTop: 10
  },
  FwBold: {
    fontWeight: 'bold'
  },
  Wp40: {
    width: '40%'
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
  Wp25: {
    width: '25%'
  },
  Wp70: {
    width: '70%'
  },
  Wp30: {
    width: '30%'
  },
  Mt7: {
    marginTop: 7
  },
  DalignItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Mt5: {
    marginTop: 5
  },
  Ml5: {
    marginLeft: 5
  }
})


export default RecurringMeeting