import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    alignItems: "center"
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  name: {
    fontSize: 20,
    marginTop: 10
  },
  email: {
    fontSize: 13,
    color: "#aaa"
  },
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    marginVertical: 10
  },
  separatorText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  green: {
    color: "#12D790"
  },
  red: {
    color: "#FF6848"
  },
  halfInputs: {
    flexDirection: "row"
  },
  inputContainer1: {
    flex: 1
  },
  inputContainer2: {
    flex: 1
  },
  input1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  input2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  uploadText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  uploadLicense: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 2,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  placeholder: {
    fontSize: 14,
    color: "#9B9B9B"
  },
  button: {
    width: 70,
    height: "100%",
    backgroundColor: "#EE4137",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  error: { color: "#FF5733" },
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
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {},
  heading: {
    height: 60,
    backgroundColor: "#333333",
    padding: 20,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  },
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

// API authentication token
const ACCESS_TOKEN = "";

export default {
  styles: styles,
  ACCESS_TOKEN: ACCESS_TOKEN
};
