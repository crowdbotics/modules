import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { RadioButton } from "react-native-paper";

const MeetingID = ({ meetingSchedule, setMeetingSchedule }) => {
  return (
      <View style={styles.Mt5}>
        <Text style={styles.MeetingID}>Meeting ID</Text>
        <View style={styles.MeetingRow}>
          <View style={styles.InputsArea}>
            <View style={styles.RadioButtons}>
              <RadioButton
                value="false"
                status={!meetingSchedule.meetingID ? "checked" : "unchecked"}
                onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: false })}
              />
              <Text numberOfLines={2} style={styles.W100}>Generate Automatically</Text>
            </View>
          </View>
          <View style={styles.InputsArea}>
            <View style={styles.RadioButtons}>
              <RadioButton
                value="true"
                status={meetingSchedule.meetingID ? "checked" : "unchecked"}
                onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: true })}
              />
              <Text numberOfLines={2} style={styles.W100}>Personal Meeting ID</Text>
            </View>
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  MeetingID: {
    fontWeight: "bold",
    fontSize: 14
  },
  MeetingRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5
  },
  InputsArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    paddingRight: 5
  },
  RadioButtons: {
    display: "flex",
    flexDirection: "row"
  },
  Mt5: {
    marginTop: 5
  },
  W100: {
    width: 100
  }
});
export default MeetingID;
