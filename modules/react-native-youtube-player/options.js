// @ts-ignore
import { StyleSheet } from "react-native";

const YOUTUBE_API_KEY = "";
const VIDEOS_IDS = ["uMK0prafzw0"];

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  buttonGroup: {
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: 5,
    width: "100%",
    justifyContent: "space-evenly"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  player: {
    alignSelf: "stretch",
    marginVertical: 20
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 7
  },
  text: {
    color: "white",
    fontSize: 15
  },
  iconValue: { marginTop: -12, marginLeft: 7, color: "#fff" },
  iconNextValue: { marginTop: -12, marginLeft: 10, color: "#fff" },
  loopStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "40%",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 7
  }
});

export default {
  styles: styles,
  YOUTUBE_API_KEY: YOUTUBE_API_KEY,
  VIDEOS_IDS: VIDEOS_IDS
};
