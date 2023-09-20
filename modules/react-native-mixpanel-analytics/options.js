import { StyleSheet } from "react-native";
import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = true;
const projectToken = "";
const mixpanel = new Mixpanel(projectToken, trackAutomaticEvents);

const styles = StyleSheet.create({
  subHeading: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
    marginLeft: 20,
    marginVertical: 20
  },
  buttonTitleStyles: { fontSize: 16, color: "#fff", fontWeight: "500" },
  buttonStyles: {
    backgroundColor: "#000",
    width: "40%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  buttonContainer: {
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20
  },
  enableTrackingButton: { fontSize: 18, color: "#000", marginRight: 20 },
  switchView: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row"
  },
  idValue: { fontSize: 18, color: "grey", marginLeft: 20 },
  idKey: { fontSize: 18, color: "#000" },
  idView: { flexDirection: "row", marginHorizontal: 20, marginTop: 50 },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mainHeading: {
    fontSize: 30,
    fontWeight: "500",
    color: "#000",
    alignSelf: "center",
    marginTop: 20
  }
});

const trackEvent = (eventName, properties) => {
  return mixpanel.track(eventName, properties);
};

export default {
  styles: styles,
  trackEvent,
  mixpanel,
  projectToken
};
