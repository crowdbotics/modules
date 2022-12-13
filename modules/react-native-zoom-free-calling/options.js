import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({

});
const recurrentMeeting = {
  daily: 15,
  weekly: 12,
  monthly: 3
};
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const SDK_KEY = "";
const SDK_SECRET = "";
const REDIRECT_URI = "https://www.crowdbotics.com";

const checkboxColor = { true: "#24ebde", false: "lightgray" };
const initialWeeklyList = [{
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
}];

const initialWeeksList = [{
  label: "First",
  value: "1",
  isSelected: true
}, {
  label: "Second",
  value: "2",
  isSelected: false
}, {
  label: "Third",
  value: "3",
  isSelected: false
}, {
  label: "Fourth",
  value: "4",
  isSelected: false
}, {
  label: "Last",
  value: "-1",
  isSelected: false
}];

const initialDaysList = [{
  label: "Sunday",
  value: "1",
  isSelected: true
}, {
  label: "Monday",
  value: "2",
  isSelected: false
}, {
  label: "Tuesday",
  value: "3",
  isSelected: false
}, {
  label: "Wednesday",
  value: "4",
  isSelected: false
}, {
  label: "Thursday",
  value: "5",
  isSelected: false
}, {
  label: "Friday",
  value: "6",
  isSelected: false
}, {
  label: "Saturday",
  value: "7",
  isSelected: false
}];

const initialOccurrencesList = [
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
];
const initialRecurrenceList = [{
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
  value: "-1"
}];

const initialMeetingSchedule = {
  topic: "",
  startDate: new Date(),
  timezone: "America/Los_Angeles",
  meetingID: false,
  hostVideo: true,
  participantsVideo: true,
  recurring_meeting: false,
  recurrence: {
    recurrence_type: "1",
    repeatEvery: "1",
    endDate: new Date(),
    occurrences: "7",
    isBy: true,
    weekly_days: "1",
    isDayMonthly: true,
    dayOfMonth: "23",
    week: "1",
    day: "1"
  }
};

export default {
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  SDK_KEY: SDK_KEY,
  SDK_SECRET: SDK_SECRET,
  REDIRECT_URI: REDIRECT_URI,
  initialWeeklyList: initialWeeklyList,
  initialWeeksList: initialWeeksList,
  initialDaysList: initialDaysList,
  initialOccurrencesList: initialOccurrencesList,
  initialRecurrenceList: initialRecurrenceList,
  initialMeetingSchedule: initialMeetingSchedule,
  CHECKBOX_COLOR_FALSE: "lightgray",
  CHECKBOX_COLOR_TRUE: "#24ebde",
  recurrentMeeting: recurrentMeeting,
  checkboxColor: checkboxColor,
  styles: styles
};
