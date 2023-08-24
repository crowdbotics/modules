import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { RadioButton } from "react-native-paper";

const Video = ({ meetingSchedule, setMeetingSchedule }) => {
  return (
    <View style={styles.Mt10}>
      <Text style={styles.VideoText}>Video</Text>
      <View style={styles.VideoMain}>
        <View style={styles.VideoContainer}>
          <Text style={styles.Mt8}>Host</Text>
          <View style={styles.Dflex}>
            <RadioButton
              value="true"
              status={meetingSchedule.hostVideo ? "checked" : "unchecked"}
              onPress={() => setMeetingSchedule({ ...meetingSchedule, hostVideo: true })}
            />
            <RadioButton
              value="false"
              status={!meetingSchedule.hostVideo ? "checked" : "unchecked"}
              onPress={() => setMeetingSchedule({ ...meetingSchedule, hostVideo: false })}
            />
          </View>
        </View>
        <View style={styles.VideoContainer}>
          <Text style={styles.Mt8}>Participants</Text>
          <View style={styles.Dflex}>
            <RadioButton
              value="true"
              status={meetingSchedule.participantsVideo ? "checked" : "unchecked"}
              onPress={() => setMeetingSchedule({ ...meetingSchedule, participantsVideo: true })}
            />
            <RadioButton
              value="false"
              status={!meetingSchedule.participantsVideo ? "checked" : "unchecked"}
              onPress={() => setMeetingSchedule({ ...meetingSchedule, participantsVideo: false })}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  VideoText: {
    fontWeight: "bold",
    fontSize: 14
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
  Mt8: {
    marginTop: 8
  },
  Mt10: {
    marginTop: 10
  },
  Dflex: {
    display: "flex",
    flexDirection: "row"
  }
});

export default Video;
