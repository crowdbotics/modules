import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

import DatePicker from "react-native-date-picker";

import CheckBox from "@react-native-community/checkbox";
import Input from "../Input";
import options from "../../options";

const RecurringMeeting = ({
  meetingSchedule,
  setMeetingSchedule
}) => {
  const [repeatEveryList, setRepeatEveryList] = useState([]);
  const [weeksList, setWeeksList] = useState(options.initialWeeksList);
  const [daysList, setDaysList] = useState(options.initialDaysList);
  const [recurrenceList, setRecurrenceList] = useState(options.initialRecurrenceList);
  const [occursOnList, setOccursOnList] = useState([]);
  const [occurrencesList, setOccurrencesList] = useState(options.initialOccurrencesList);
  const [openOccurrences, setOccurrences] = useState(false);
  const [openRecurrenceType, setOpenRecurrenceType] = useState(false);
  const [openRepeatEvery, setOpenRepeatEvery] = useState(false);
  const [openOccursOn, setOpenOccursOn] = useState(false);
  const [openWeeks, setOpenWeeks] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [weeklyList, setWeeklyList] = useState(options.initialWeeklyList);

  useEffect(() => {
    const tmpRepeatEveryList = [];
    if (meetingSchedule.recurrence.recurrence_type === "1") {
      for (let i = 0; i < options.recurrentMeeting.daily; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() });
      }
    } else if (meetingSchedule.recurrence.recurrence_type === "2") {
      for (let i = 0; i < options.recurrentMeeting.weekly; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() });
      }
    } else if (meetingSchedule.recurrence.recurrence_type === "3") {
      for (let i = 0; i < options.recurrentMeeting.monthly; i++) {
        tmpRepeatEveryList.push({ label: (i + 1).toString(), value: (i + 1).toString() });
      }
    }
    setRepeatEveryList(tmpRepeatEveryList);
  }, [meetingSchedule.recurrence.recurrence_type]);

  useEffect(() => {
    const tmpOccursOnList = [];
    for (let i = 0; i < 31; i++) {
      tmpOccursOnList.push({ label: (i + 1).toString(), value: (i + 1).toString() });
    }
    setOccursOnList(tmpOccursOnList);
  }, []);

  const handleWeeklyCheckbox = (weekIndex) => {
    const tmpWeeklyList = JSON.parse(JSON.stringify(weeklyList));
    tmpWeeklyList[weekIndex].isSelected = !tmpWeeklyList[weekIndex].isSelected;
    setWeeklyList(tmpWeeklyList);
    const weeklyDays = tmpWeeklyList.filter(obj => obj.isSelected).map(obj => obj.value);
    setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, weeklyDays: weeklyDays.toString() } });
  };

  return (
    <Fragment>
      <View style={styles.Dflex}>
        <CheckBox
          tintColors={{ true: "#24ebde", false: "lightgray" }}
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
        {meetingSchedule.recurrence.recurrence_type !== "-1" &&
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
            <Text style={styles.Ml5}>{meetingSchedule.recurrence.recurrence_type === "2" ? "Week" : "day"}</Text>
          </View>
        }

        {meetingSchedule.recurrence.recurrence_type === "2" &&
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

        {meetingSchedule.recurrence.recurrence_type === "3" &&
          <View style={styles.RecurrenceArea}>
            <View>
              <Text style={styles.RepeatText}>Occurs on</Text>
            </View>
            <View>
              <View style={styles.MeetingTypeThreeOccurs}>
                <RadioButton
                  value="true"
                  status={meetingSchedule.recurrence.isDayMonthly ? "checked" : "unchecked"}
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
                  status={!meetingSchedule.recurrence.isDayMonthly ? "checked" : "unchecked"}
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
        {meetingSchedule.recurrence.recurrence_type !== "-1" && <>
          <View style={styles.Mt8}>
            <Text style={styles.EndText}>End date</Text>
          </View>
          <View style={styles.FlexCenter}>
            <View style={styles.EndDateText}>
              <View>
                <RadioButton
                  value="true"
                  status={meetingSchedule.recurrence.isBy ? "checked" : "unchecked"}
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
                    setOpenEndDate(false);
                    setMeetingSchedule({ ...meetingSchedule, recurrence: { ...meetingSchedule.recurrence, endDate: date } });
                  }}
                  onCancel={() => {
                    setOpenEndDate(false);
                  }}
                />
              </View>
            </View>

            <View style={[styles.RadioButtonArea, styles.Mt10]}>
              <View>
                <RadioButton
                  value="false"
                  status={!meetingSchedule.recurrence.isBy ? "checked" : "unchecked"}
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
  );
};

const styles = StyleSheet.create({
  Dflex: {
    display: "flex",
    flexDirection: "row"
  },
  RadioButtons: {
    display: "flex",
    flexDirection: "row"
  },
  RecurrenceArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  FlexCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  RecurrenceText: {
    fontSize: 14,
    marginTop: 5,
    paddingRight: 5,
    fontWeight: "bold"
  },
  RadioButtonArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
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
    height: 39
  },
  Mt8: {
    marginTop: 8
  },
  Mt10: {
    marginTop: 10
  },
  FwBold: {
    fontWeight: "bold"
  },
  Wp40: {
    width: "40%"
  },
  MeetingTypeTwoOccurs: {
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  MeetingTypeThreeOccurs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5
  },
  DropDownContainer: {
    width: "32%",
    marginRight: 5
  },
  DisplayWidth: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  RepeatText: {
    fontSize: 14,
    marginTop: 8,
    paddingRight: 10,
    fontWeight: "bold"
  },
  EndText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  EndDateText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "40%"
  },
  Wp25: {
    width: "25%"
  },
  Wp70: {
    width: "70%"
  },
  Wp30: {
    width: "30%"
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
});

export default RecurringMeeting;
