import moment from "moment";
import React from "react";
import { Modal, StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../Button";

const AppointmentModal = ({ modalItem, setModalVisible, modalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Appointment details</Text>
        <Text style={styles.modalText}>Title: {modalItem.summary}</Text>
        <Text style={styles.modalText}>Status: {modalItem.status}</Text>
        <Text style={styles.modalText}>Location: {modalItem.location}</Text>
        <Text style={styles.modalText}>Start time: {("start" in modalItem) ? moment(new Date(modalItem.start.dateTime)).format("YYYY-MM-DD HH:mm A") : ""}</Text>
        <Text style={styles.modalText}>End time: {("end" in modalItem) ? moment(new Date(modalItem.end.dateTime)).format("YYYY-MM-DD HH:mm A") : ""}</Text>

        <View style={styles.attendeeContainer}>
          <ScrollView>
          <Text style={styles.text}>Organizer:</Text>
          <View style={styles.attendee}>
                <Text style={styles.attendeeText}>{modalItem?.creator?.email}</Text>
          </View>
          <Text style={[styles.text, styles.mt]}>Participants:</Text>
          {
             modalItem?.attendees
               ? modalItem?.attendees?.map((attendee, index) =>
              <View style={styles.attendee} key={index}>
                {!attendee?.organizer && <Text style={styles.attendeeText}>{attendee?.organizer ? "" : attendee.email}</Text>}
              </View>
               )
               : <Text style={styles.noAttendee}>No Participants!</Text>
          }
          </ScrollView>
        </View>

        <View style={styles.modalActionButton}>
          <Button height={40} onPress={() => setModalVisible(false)} style={styles.hide}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { minHeight: "50%", width: "95%", alignSelf: "center", backgroundColor: "#FFF", display: "flex", justifyContent: "center", marginTop: "15%", borderRadius: 10, padding: 20, shadowColor: "gray", elevation: 15 },
  hide: { marginTop: "30%", alignSelf: "center" },
  modalText: { fontSize: 16, padding: 15, marginVertical: 4, borderWidth: 1, borderColor: "#CCCCCC", borderRadius: 4, borderLeftWidth: 5, borderLeftColor: "#000" },
  attendeeContainer: { paddingVertical: 10, paddingHorizontal: 10, marginVertical: 4, borderWidth: 1, borderColor: "#CCCCCC", borderRadius: 4, borderLeftWidth: 5, borderLeftColor: "#000", height: "30%" },
  modalHeaderText: {
    fontSize: 18,
    paddingVertical: 5,
    marginBottom: 10,
    fontWeight: "700",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderColor: "#CCCCCC"
  },
  modalActionButton: {
    marginTop: 20,
    width: 100,
    alignSelf: "flex-end"
  },
  attendee: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start" },
  attendeeText: { paddingVertical: 5, backgroundColor: "#F5F5F5", paddingHorizontal: 10, marginBottom: 5, marginRight: 5, borderRadius: 7 },
  organizer: { color: "#3bae61", fontSize: 12 },
  mt: { marginTop: 5 },
  text: { marginBottom: 5 },
  noAttendee: { textAlign: "center", fontSize: 12, color: "#a59b9b" }
});

export default AppointmentModal;
