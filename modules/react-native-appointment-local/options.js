import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
const TimeSlots = [
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00"
];

const ACCESS_TOKEN = "";

export default {
  timeSlots: TimeSlots,
  styles: styles,
  ACCESS_TOKEN: ACCESS_TOKEN
};
