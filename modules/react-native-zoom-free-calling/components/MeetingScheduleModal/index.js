import React, { useState, Fragment } from "react";
import { View, Text, Modal, SectionList, StyleSheet } from "react-native";
import Input from "../Input";
import options from "../../options";
import Video from "../Video";
import MeetingID from "../MeetingId";
import RecurringMeeting from "../RecurringMeeting";
import MeetingTime from "../MeetingTime";
import Actions from "../Actions";

const MeetingScheduleModal = (props) => {
  const [meetingSchedule, setMeetingSchedule] = useState(options.initialMeetingSchedule);
  const [errors, setErrors] = useState({ topic: "" });

  const handleSave = () => {
    if (meetingSchedule.topic === "") {
      setErrors({ ...errors, topic: "This field is required." });
      return;
    }
    props.onHandleMeetingSchedule(meetingSchedule);
  };

  const meetingTopic = () => {
    return (
      <View style={styles.Mt10}>
        <Input
          label="Meeting topic"
          errorMessage={(errors.topic !== "") ? "This field is required." : ""}
          onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, topic: text })}
        />
      </View>
    );
  };

  const DATA = [
    {
      data: [meetingTopic(),
        <MeetingTime key="MeetingTime" meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
        <RecurringMeeting key={"RecurringMeeting"} meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
        <MeetingID key={"MeetingID"} meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
        <Video key={"Video"} meetingSchedule={meetingSchedule} setMeetingSchedule={setMeetingSchedule} />,
        <Actions key={"Actions"} handleSave={handleSave} setModalVisible={props.setModalVisible} />]
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
          renderItem={({ item, index }) => <Fragment key={index}>{item}</Fragment>}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginBottom: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  heading: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginRight: 40
  },
  Mt10: {
    marginTop: 10
  }
});

export default MeetingScheduleModal;
