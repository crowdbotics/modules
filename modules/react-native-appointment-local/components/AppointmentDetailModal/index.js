import React, { useContext } from "react";
import { Modal, View, Text } from "react-native";
import Button from "../Button";
import { OptionsContext } from "@options";
import moment from "moment";

/**
 * Modal component to show appointment details
 * @param  {Object} modalItem Object containing all appointment details
 * @param  {Function} setModalVisible Function which changes if modal will be visible or not
 * @param  {Boolean} setModalVisible State which shows if modal is currently visible or not
 * @return {React.ReactNode}
 */
const AppointmentModal = ({ modalItem, setModalVisible, modalVisible }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  const { name, address } = modalItem;

  const getDuration = () =>
    moment
      .utc(
        moment(modalItem?.end_time, "HH:mm:ss").diff(
          moment(modalItem?.start_time, "HH:mm:ss")
        )
      )
      .format("HH:mm:ss");

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Appointment details</Text>
        <Text style={styles.modalText}>Title: {name}</Text>
        <Text style={styles.modalText}>Location: {address}</Text>
        <Text style={styles.modalText}>
          Duration: {getDuration().toString()}
        </Text>
        <Text style={styles.modalText}>Description: {modalItem?.add_note}</Text>
        <View style={styles.modalActionButton}>
          <Button
            height={40}
            onPress={() => setModalVisible(false)}
            style={styles.hide}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentModal;
