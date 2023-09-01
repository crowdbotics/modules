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
  label: {
    color: "#000000",
    fontSize: 14,
    textTransform: "capitalize",
    width: "100%"
  },
  createAppointmentContainer: {
    height: "100%",
    padding: 10
  },
  dropdown: {
    borderColor: "#C4C4C4",
    height: 53
  },
  timeSlotText: {
    marginVertical: 20,
    fontSize: 14
  },
  head: {
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
  timeSlotList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  createAppointmentButton: {
    padding: 15
  },

  items: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D8D8D8",
    width: 90,
    height: 30,
    margin: 7,
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mt15: {
    marginTop: 15
  },
  NextButton: {
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
  main: {
    backgroundColor: "#F1F1F1",
    height: "100%"
  },
  appointmentDetailContainer: {
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
  card: {
    backgroundColor: "#DADADA",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  box: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#FCF1D6"
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1E2022"
  },
  date: {
    fontSize: 14,
    fontWeight: "400",
    color: "#77838F"
  },
  delete: {
    height: 106,
    width: 60,
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
  mb10: {
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 10
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
  appointmentName: {
    fontSize: 16
  },
  calendarStrip: {
    height: 100,
    paddingBottom: 10
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
  appointmentNameCard: {
    backgroundColor: "#DADADA",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  },
  inputContainer: {
    width: "100%",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff"
  },
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15
  },
  modalContainer: {
    minHeight: "40%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    marginTop: "40%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "gray",
    elevation: 15
  },
  hide: {
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

// API Authentication token
const ACCESS_TOKEN = "";
// Backend user identifier
const USER_ID = 1;

export default {
  styles: styles,
  ACCESS_TOKEN: ACCESS_TOKEN,
  USER_ID: USER_ID
};
