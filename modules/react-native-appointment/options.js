import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#F1F1F1",
    height: 48,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10
  },
  indicator: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 37,
    shadowColor: "#000",
    elevation: 5
  },
  indicatorContainer: {
    height: 37,
    marginTop: 6
  },
  tabLabel: {
    color: "#000000",
    fontSize: 14,
    textTransform: "capitalize",
    width: "100%"
  },
  createAppointmentContainer: {
    height: "100%",
    padding: 10
  },
  headerView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 17,
    borderColor: "#F0F2F7",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  headItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  headerComponents: {
    fontSize: 22,
    color: "#313633"
  },
  headerText: {
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 8
  },
  mt15: {
    marginTop: 15
  },
  mb10: {
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 10
  },
  slotList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  createButton: {
    padding: 15
  },
  addAttendee: {
    backgroundColor: "#000",
    paddingHorizontal: 25,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7
  },
  addButtonText: {
    color: "#fff",
    alignSelf: "center"
  },
  attendeeInput: {
    width: "80%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  attendee: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5
  },
  addAttendeeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  attendeesList: {
    marginTop: 10
  },
  error: {
    color: "#f77474",
    fontStyle: "italic",
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 5
  },
  removeAttendee: {
    backgroundColor: "red",
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 4
  },
  removeAttendeeText: {
    color: "white",
    fontWeight: "bold"
  },
  jZgRJHGs: {
    marginVertical: 20,
    fontSize: 14
  },
  slotItems: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D8D8D8",
    width: 90,
    height: 30,
    margin: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  timeSlotList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  nextButton: {
    padding: 30
  },
  ph10: {
    paddingHorizontal: 15
  },
  timeSlot: {
    marginVertical: 10,
    fontSize: 14,
    marginLeft: 10
  },
  durationDropdown: {
    borderColor: "#C4C4C4",
    height: 53
  },
  appointmentContainer: {
    backgroundColor: "#F1F1F1",
    height: "100%",
    paddingHorizontal: 10
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 106,
    marginBottom: 15
  },
  box: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#FCF1D6"
  },
  details: {
    width: "50%"
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1E2022"
  },
  dateText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#77838F"
  },
  deleteView: {
    height: 106,
    width: 65,
    borderRadius: 10
  },
  deleteButton: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA4335",
    borderRadius: 10
  },
  mv10: {
    marginVertical: 10
  },
  deleteIcon: {
    height: 17,
    width: 17
  },
  appointmentListContainer: {
    padding: 10,
    height: "100%",
    width: "100%"
  },
  calendarText: {
    fontSize: 14,
    color: "#1E2022"
  },
  calendarTextContainer: {
    marginTop: 20,
    marginLeft: 14
  },
  listText: {
    fontSize: 14,
    color: "#1E2022"
  },
  viewAll: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 14
  },
  appointmentItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  card: {
    backgroundColor: "#FCF1D6",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  eWkmXrRh: {
    fontSize: 16
  },
  vFIpjHzC: {
    height: 100,
    paddingBottom: 10
  },
  textInputContainer: {
    width: "100%",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff"
  },
  inputStyles: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14
  },
  textInputError: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  },
  buttonView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonTitle: {
    fontWeight: "bold",
    fontSize: 15
  },
  modalContainer: {
    minHeight: "50%",
    maxHeight: "85%",
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    marginTop: "15%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "gray",
    elevation: 15
  },
  hideButton: {
    marginTop: "30%",
    alignSelf: "center"
  },
  modalText: {
    fontSize: 16,
    padding: 15,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#000"
  },
  attendeeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#000"
  },
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
  attendeeText: {
    paddingVertical: 5,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 7
  },
  organizer: {
    color: "#3bae61",
    fontSize: 12
  },
  mt: {
    marginTop: 5
  },
  text: {
    marginBottom: 5
  },
  noAttendee: {
    textAlign: "center",
    fontSize: 12,
    color: "#a59b9b"
  },
  textDecorationLine: {
    textDecorationLine: "underline"
  }
});

const ANDROID_CLIENT_ID = "ANDROID_CLIENT_ID";
const IOS_CLIENT_ID = "IOS_CLIENT_ID";
const WEB_CLIENT_ID = "WEB_CLIENT_ID";
const SCOPES_STRING =
  "https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/calendar.events,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/drive.file";
const CREATE_SHARED_FOLDER = false;
const CREATE_HUBSPOT_CONTACT = false;
const CREATE_HUBSPOT_DEAL = false;
const CREATE_SLACK_CHANNEL = false;
const SLACK_ADMIN_CREDENTIALS = "ADMIN_CREDS";

export default {
  ANDROID_CLIENT_ID: ANDROID_CLIENT_ID,
  IOS_CLIENT_ID: IOS_CLIENT_ID,
  WEB_CLIENT_ID: WEB_CLIENT_ID,
  SCOPES_STRING: SCOPES_STRING,
  SLACK_ADMIN_CREDENTIALS: SLACK_ADMIN_CREDENTIALS,
  CREATE_SHARED_FOLDER: CREATE_SHARED_FOLDER,
  CREATE_HUBSPOT_CONTACT: CREATE_HUBSPOT_CONTACT,
  CREATE_HUBSPOT_DEAL: CREATE_HUBSPOT_DEAL,
  CREATE_SLACK_CHANNEL: CREATE_SLACK_CHANNEL,
  styles: styles
};
