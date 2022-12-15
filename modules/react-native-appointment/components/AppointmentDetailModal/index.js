import moment from "moment";
import React from "react";
import { Modal, StyleSheet, View, Text } from "react-native";
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

  modalContainer: { minHeight: "40%", width: "90%", alignSelf: "center", backgroundColor: "#FFF", display: "flex", justifyContent: "center", marginTop: "40%", borderRadius: 10, padding: 20, shadowColor: "gray", elevation: 15 },
  hide: { marginTop: "30%", alignSelf: "center" },
  modalText: { fontSize: 16, padding: 15, marginVertical: 4, borderWidth: 1, borderColor: "#CCCCCC", borderRadius: 4, borderLeftWidth: 5, borderLeftColor: "#000" },
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
  }
});

export default AppointmentModal;
