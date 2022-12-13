import React from "react";
import { View, Text, Pressable, SectionList, StyleSheet } from "react-native";
import { parseMeetingId } from "../../utils";
import { timezones } from "../../timezones";

const ScheduleMeetingList = (props) => {
  const listItem = (item) => {
    return (
      <View style={styles.TimeArea}>
        <View style={styles.TimeAndLocation}>
          <Text style={styles.TimeText}>{("start_time" in item) ? new Date(item.start_time).toLocaleString() : "Recurring"}</Text>
          <Text numberOfLines={2} style={styles.LocationText}>{timezones.find(obj => obj.value === item.timezone).label}</Text>
        </View>
        <View style={styles.MeetingDay}>
          <Text numberOfLines={3} style={styles.TimeText}>{item.topic}</Text>
          <Text style={styles.MeetingIDText}>Meeting ID: {parseMeetingId(item.join_url).replace(/(\d{3})/g, "$1 ")}</Text>
        </View>
        <View style={styles.ButtonArea}>
          <Pressable onPress={() => props.joinMeeting(parseMeetingId(item.join_url))} style={[styles.EditButton, styles.EditBtn]}>
            <Text style={styles.textStyle}>Join</Text>
          </Pressable>
          <Pressable onPress={() => props.handleRemoveMeeting(item)} style={[styles.EditButton, styles.DeleteBtn]}>
            <Text style={styles.textStyle}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <SectionList
      sections={props.upcomingMeetingsList}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => listItem(item)}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.TitleText}>{title}</Text>
      )}
      ListEmptyComponent={() => (
        <View style={{}}>
          <Text style={styles.UpcomingText}>Upcoming Meetings</Text>
          <Text style={styles.NewMeetingText}>The user does not have any upcoming meetings. To schedule a new meeting click Schedule a Meeting.</Text>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  ButtonArea: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
    textAlign: "center"
  },
  buttonOpen: {
    backgroundColor: "#FA060D"
  },
  EditBtn: {
    backgroundColor: "#0e71eb"
  },
  DeleteBtn: {
    backgroundColor: "#FA060D"
  },
  EditButton: {
    borderRadius: 6,
    marginLeft: 10,
    marginTop: 8,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 12,
    textAlign: "center",
    alignItems: "center",
    display: "flex"
  },
  buttonClose: {
    backgroundColor: "#2D8CFF"
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
    color: "black",
    fontWeight: "bold",
    marginRight: 40
  },
  ModalContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  InputLabels: {
    width: "49%"
  },
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
  VideoText: {
    fontWeight: "bold",
    fontSize: 14
  },
  TimeAndLocation: {
    display: "flex",
    flexDirection: "column",
    width: "30%"
  },
  TimeText: {
    fontSize: 12
  },
  MeetingDay: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    width: 130
  },
  LocationText: {
    color: "#747487",
    fontSize: 11
  },
  TimeArea: {
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  MeetingIDText: {
    fontSize: 11,
    color: "#747487"
  },
  TitleText: {
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold"
  },
  UpcomingText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  NewMeetingText: {
    marginTop: 50,
    color: "#747487",
    padding: 40,
    textAlign: "center",
    fontSize: 13
  }
});
export default ScheduleMeetingList;
