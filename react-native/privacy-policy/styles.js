import { StyleSheet } from "react-native";

import { DimensionsStyle } from "./utils";

export const styles = StyleSheet.create({
  parallaxHeader: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 15,
    backgroundColor: "#F3F3F3",
    borderRadius: 30,
  },
  parallaxText: {
    fontFamily: "Avenir-Medium",
    fontSize: 16,
    textAlign: "center",
    color: "#8D8D8D",
  },
  header: {
    height: 290,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    position: "relative",
    paddingTop: DimensionsStyle.safeAreaTopHeight + 20,
  },
  headerText: {
    fontSize: 27,
    color: "#fff",
    fontFamily: "Avenir-Medium",
  },
  icon: {
    width: 18,
    height: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 60,
  },
  button: {
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7AA741",
    height: 46,
    width: 293,
    marginTop: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Avenir Heavy",
  },
});
