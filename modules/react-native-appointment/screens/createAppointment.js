import React, { useState, useContext, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Input from "../components/InputText"; // @ts-ignore
import { OptionsContext, GlobalOptionsContext } from "@options";
import Button from "../components/Button";
import {
  createSlackChannel,
  createGoogleFolder,
  createHubSpotDeal
} from "../api";
import { createAppointment } from "../store";
import Loader from "../components/Loader";
import moment from "moment";
import { timeSlots, validateEmail } from "../utils"; // @ts-ignore
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**
 * Component to create a new appointment by selecting date, time slot, and participants.
 * @param {Object} route - Route object provided by React Navigation.
 * @param {Object} navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} - The rendered CreateAppointment component.
 */
const CreateAppointment = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    styles,
    SLACK_ADMIN_CREDENTIALS,
    CREATE_SHARED_FOLDER,
    CREATE_HUBSPOT_CONTACT,
    CREATE_HUBSPOT_DEAL,
    CREATE_SLACK_CHANNEL
  } = useContext(OptionsContext);
  const { url } = useContext(GlobalOptionsContext);
  const { duration, selectedDate } = route.params;
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [timeSlot, setTimeSlot] = useState(route.params.timeSlot);
  const [isLoading, setIsLoading] = useState(false);
  const [attendeesList, setAttendeesList] = useState([]);
  const [attendee, setAttendee] = useState("");
  const [validationError, setValidationError] = useState({
    email: ""
  });

  /**
   * Function to create the appointment.
   * Performs various actions like creating a shared folder, creating a HubSpot deal,
   * creating a Slack channel, and dispatching the appointment creation action.
   */
  const onCreateAppointment = async () => {
    setIsLoading(true);
    const tokens = await GoogleSignin.getTokens();

    let folder = null;
    if (CREATE_SHARED_FOLDER) {
      folder = await createGoogleFolder(url, tokens.accessToken, {
        folder_name: title,
        share_with: attendeesList.map((attendee) => attendee.email)
      }).catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
    }

    if (CREATE_HUBSPOT_DEAL) {
      await createHubSpotDeal(url, {
        deal: {
          dealname: title,
          dealstage: "appointmentscheduled",
          pipeline: "default"
        },
        associations: CREATE_HUBSPOT_CONTACT && {
          emails: attendeesList.map((attendee) => attendee.email).toString()
        }
      })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
          setIsLoading(false);
        });
    }

    const sharedFolder = folder && "\n Shared Folder: " + folder?.webViewLink;
    const calendarInvite = {
      summary: title,
      description: description + " " + sharedFolder,
      location: location,
      start: {
        dateTime: moment(`${selectedDate} ${timeSlot}`).format()
      },
      end: {
        dateTime: moment(`${selectedDate} ${timeSlot}`)
          .add(moment.duration(duration))
          .format()
      },
      attendees: attendeesList,
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          },
          requestId: Date.now().toString()
        }
      },
      attachments: CREATE_SHARED_FOLDER &&
        folder && [
        {
          fileId: folder.id,
          title: title
        }
      ]
    };

    await dispatch(
      createAppointment({
        accessToken: tokens.accessToken,
        payload: calendarInvite
      })
    )
      .then(unwrapResult)
      .then(async () => {
        if (CREATE_SLACK_CHANNEL) {
          await createSlackChannel(url, SLACK_ADMIN_CREDENTIALS, {
            channel_name: "Deal " + title,
            emails: attendeesList.map((item) => item.email).toString()
          });
        }
        setIsLoading(false);
        navigation.replace("Home");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  /**
   * Function to add a new attendee to the attendees list.
   * Validates the email and adds the attendee if it's a valid email address.
   */
  const addAttendee = () => {
    if (!validateEmail.test(attendee)) {
      return setValidationError({
        email: "Please enter a valid email address."
      });
    } else {
      setValidationError({
        email: ""
      });
    }

    setAttendeesList((attendeesList) => [
      ...attendeesList,
      {
        email: attendee
      }
    ]);
    setAttendee("");
  };

  /**
   * Function to handle changes in the attendee input field.
   * Updates the attendee state and clears validation errors.
   * @param {string} text - The text value of the attendee input field.
   */
  const handleChangeAttendee = (text) => {
    setAttendee(text);
    setValidationError({
      email: ""
    });
  };

  /**
   * Function to handle the removal of an attendee from the attendees list.
   * @param {number} index - The index of the attendee to be removed.
   */
  const handleRemoveAttendee = (index) => {
    const tmpAttendeesList = JSON.parse(JSON.stringify(attendeesList));
    tmpAttendeesList.splice(index, 1);
    setAttendeesList(tmpAttendeesList);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Loader />}
        <View style={styles.createAppointmentContainer}>
          <View style={styles.headerView}>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{selectedDate}</Text>
              <Text style={styles.headerText}>Appointment date</Text>
            </View>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{timeSlot}</Text>
              <Text style={styles.headerText}>Time</Text>
            </View>
            <View style={styles.headItems}>
              <Text style={styles.headerComponents}>{duration}</Text>
              <Text style={styles.headerText}>Duration</Text>
            </View>
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Title</Text>
            <Input placeholder="Title" setValue={setTitle} value={title} />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Location</Text>
            <Input
              placeholder="Location"
              setValue={setLocation}
              value={location}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Description</Text>
            <Input
              placeholder="Description"
              setValue={setDescription}
              value={description}
              multiline={true}
            />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.mb10}>Participants</Text>
            <View style={styles.addAttendeeContainer}>
              <Input
                placeholder="Participant Email"
                setValue={handleChangeAttendee}
                value={attendee}
                multiline={true}
                styles={styles.attendeeInput}
              />
              <TouchableOpacity
                style={styles.addAttendee}
                onPress={addAttendee}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {validationError.email !== "" && (
              <Text style={styles.error}>{validationError.email}</Text>
            )}
          </View>
          <View style={styles.attendeesList}>
            {attendeesList.map((attendee, index) => (
              <View style={styles.attendee} key={index}>
                <Text style={styles.attendeeText}>{attendee?.email}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveAttendee(index)}
                  style={styles.removeAttendee}
                >
                  <Text style={styles.removeAttendeeText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.jZgRJHGs}>Time Slot</Text>
          <View style={styles.slotList}>
            {useMemo(() => {
              return timeSlots.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.slotItems,
                    {
                      backgroundColor: timeSlot === item ? "#000" : "#FFF"
                    }
                  ]}
                  onPress={() => setTimeSlot(item)}
                  key={index}
                >
                  <Text
                    style={{
                      color: timeSlot === item ? "#FFF" : "#000"
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ));
            }, [timeSlot])}
          </View>
          <View style={styles.createButton}>
            <Button
              disabled={!!(!title || attendeesList.length === 0)}
              onPress={onCreateAppointment}
            >
              Create Appointment
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAppointment;
