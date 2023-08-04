import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainVerificationView: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "space-between"
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold"
  },
  textPurple: {
    color: "#2E5984",
    fontWeight: "bold"
  },
  resend: {
    paddingTop: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  pt15: {
    paddingTop: 15
  },
  qrCodeMain: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  qrCodeContainer: {
    paddingTop: 30,
    alignSelf: "center"
  },
  sameDeviceContainer: {
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    padding: 10,
    zIndex: 1
  },
  authenticationText: {
    marginBottom: 10,
    color: "#000"
  },
  dropdownContainer: {
    marginTop: 30,
    marginBottom: 40
  },
  switchText: {
    marginRight: 20
  },
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  verificationText: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 18
  },
  text13: {
    fontSize: 13,
    marginBottom: 12
  },
  inputContainer: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    borderColor: "lightgray",
    color: "#000"
  },
  inputError: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  },
  button: {
    padding: 10,
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  clicked: {
    padding: 10,
    backgroundColor: "#2E5984",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  FlexRowSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  FlexRow: {
    display: "flex",
    flexDirection: "row"
  },
  wp50: {
    width: "50%"
  },
  wp100: {
    width: "100%"
  },
  p5: {
    padding: 5
  }
});

// API Authentication token
const token = "";

export default {
  styles: styles,
  token: token
};
