import React, { Fragment, useContext } from "react";
import moment from "moment";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import Button from "../Button";
import { OptionsContext } from "@options";

/**
 * A modal component for displaying appointment details.
 *
 * @param {object} modalItem - The appointment object to display.
 * @param {function} setModalVisible - Function to control the modal visibility.
 * @param {boolean} modalVisible - Indicates if the modal is visible.
 * @returns {JSX.Element} A JSX element representing the appointment details modal.
 */
const AppointmentModal = ({ modalItem, setModalVisible, modalVisible }) => {
  const { styles } = useContext(OptionsContext);

  const {
    summary,
    status,
    location,
    description,
    hangoutLink,
    htmlLink,
    start,
    end,
    attendees,
    organizer,
    attachments
  } = modalItem;

  /**
   * Opens a URL in the browser or shows an alert if the URL is unsupported.
   *
   * @param {string} link - The URL to open.
   */
  const handleOpenLink = async (link) => {
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      Linking.openURL(link);
    } else {
      Alert.alert("Alert", `Unsupported URL: ${link}`);
    }
  };

  /**
   * Extracts the domain from an email address.
   *
   * @param {string} email - The email address.
   * @returns {string} The domain part of the email address.
   */
  const extractDomain = (email) => {
    return email.split("@").pop();
  };

  /**
   * Renders the list of participants from the same firm and clients.
   *
   * @returns {JSX.Element} A JSX element representing the participant list.
   */
  const ParticipantsFromFirm = () => {
    if (!organizer || !attendees) {
      return null; // Add a check to handle missing or undefined data
    }

    const domain = extractDomain(organizer.email);
    const clientParticipants = attendees.filter(
      (attendee) => extractDomain(attendee.email) !== domain
    );

    return (
      <Fragment>
        <Text style={styles.text}>Firm Participants:</Text>
        <View style={styles.attendee}>
          <Text style={styles.attendeeText}>{organizer.email} (organizer)</Text>
        </View>
        {attendees.map((attendee) => {
          if (extractDomain(attendee.email) === domain && !attendee.organizer) {
            return (
              <View style={styles.attendee} key={attendee.email}>
                <Text style={styles.attendeeText}>{attendee.email}</Text>
              </View>
            );
          } else {
            return null;
          }
        })}
        {clientParticipants.length > 0 && (
          <>
            <Text style={[styles.text, styles.mt]}>Client Participants:</Text>
            {clientParticipants.map((attendee) => (
              <View style={styles.attendee} key={attendee.email}>
                <Text style={styles.attendeeText}>{attendee.email}</Text>
              </View>
            ))}
            <Button
              height={24}
              onPress={() => setModalVisible(false)}
              style={styles.hideButton}
            >
              Enrich Contacts
            </Button>
          </>
        )}
      </Fragment>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>Appointment details</Text>
        <ScrollView>
          <Text style={styles.modalText}>Title: {summary}</Text>
          <Text style={styles.modalText}>Status: {status}</Text>
          <Text style={styles.modalText}>Location: {location}</Text>
          <TouchableOpacity onPress={() => handleOpenLink(description)}>
            <Text style={styles.modalText}>
              Description: <Text>{description}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenLink(hangoutLink)}>
            <Text style={styles.modalText}>
              Meeting:{" "}
              <Text style={styles.textDecorationLine}>{hangoutLink}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenLink(htmlLink)}>
            <Text style={styles.modalText}>
              Calendar:{" "}
              <Text style={styles.textDecorationLine}>{htmlLink}</Text>
            </Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>
            Start time:{" "}
            {"start" in modalItem
              ? moment(new Date(start.dateTime)).format("YYYY-MM-DD HH:mm A")
              : ""}
          </Text>
          <Text style={styles.modalText}>
            End time:{" "}
            {"end" in modalItem
              ? moment(new Date(end.dateTime)).format("YYYY-MM-DD HH:mm A")
              : ""}
          </Text>
          <View style={styles.attendeeContainer}>{ParticipantsFromFirm()}</View>
          {attachments && (
            <View style={styles.attendeeContainer}>
              <Text>Attachments:</Text>
              <TouchableOpacity
                onPress={() => handleOpenLink(attachments[0]?.fileUrl)}
              >
                <Text>{attachments[0]?.fileUrl}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View style={styles.modalActionButton}>
          <Button
            height={40}
            onPress={() => setModalVisible(false)}
            style={styles.hideButton}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentModal;
