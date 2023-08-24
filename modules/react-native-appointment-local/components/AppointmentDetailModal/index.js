import React, { useContext, useMemo } from "react";
import { Modal, View, Text } from "react-native";
import Button from "../Button";
import { OptionsContext } from "@options";
import { getDuration } from "../../utils";

/**
 * Modal component to show appointment details
 * @param  {Object} modalItem Object containing all appointment details
 * @param  {Function} setModalVisible Function which changes if modal will be visible or not
 * @param  {Boolean} setModalVisible State which shows if modal is currently visible or not
 * @return {React.ReactNode}
 */
const AppointmentModal = ({ modalItem, setModalVisible, modalVisible }) => {
  const appointmentDuration = useMemo(
    () => getDuration(modalItem?.start_time, modalItem?.end_time),
    [modalItem?.end_time, modalItem?.start_time]
  );

  const options = useContext(OptionsContext);
  const { styles } = options;
  const { name, address } = modalItem;

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Appointment details</Text>
        <Text style={styles.modalText}>Title: {name}</Text>
        <Text style={styles.modalText}>Location: {address}</Text>
        <Text style={styles.modalText}>
          Duration: {appointmentDuration?.toString()}
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
