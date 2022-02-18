import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from "react-native";
import Input from '../Input';
// @ts-ignore
import { RadioButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MeetingScheduleModal = (props) => {
  const [meetingSchedule, setMeetingSchedule] = useState({
    topic: '',
    startDate: '',
    endDate: '',
    meetingID: 'auto',
    hostVideo: true,
    participantsVideo: true
  });

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
                onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, topic: text })}
              />
            </View>
            <View style={styles.ModalContent}>
              <View style={styles.InputLabels}>
                <Input
                  label="Start time"
                  onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, startDate: text })}
                />
              </View>
              <View style={styles.InputLabels}>
                <Input
                  label="End time"
                  onChangeText={(text) => setMeetingSchedule({ ...meetingSchedule, endDate: text })}
                />
              </View>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.MeetingID}>Meeting ID</Text>
              <View style={styles.MeetingRow}>
                <View style={styles.InputsArea}>
                  <View style={styles.RadioButtons}>
                    <RadioButton
                      value="auto"
                      status={meetingSchedule.meetingID == 'auto' ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: 'auto' })}
                    />
                    <Text numberOfLines={2} style={{ width: 100 }}>Generate Automatically</Text>
                  </View>
                </View>
                <View style={styles.InputsArea}>
                  <View style={styles.RadioButtons}>
                    <RadioButton
                      value="personal"
                      status={meetingSchedule.meetingID == 'personal' ? 'checked' : 'unchecked'}
                      onPress={() => setMeetingSchedule({ ...meetingSchedule, meetingID: 'personal' })}
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
                onPress={() => props.onHandleMeetingSchedule(meetingSchedule)}
              >
                <Text style={styles.textStyle}>Save</Text>
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
});

export default MeetingScheduleModal