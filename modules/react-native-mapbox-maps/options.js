import { StyleSheet } from "react-native";

export const MAPBOX_TOKEN = "sk.eyJ1IjoiZnNvdWRhIiwiYSI6ImNsZGlwNWdwcTFqdWozcnFwa3Nwc3RwdGoifQ.UnMCRmYGEZBjTHY3hBOhCA";
export const styles = StyleSheet.create({
  view: {
    height: "100%"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },

  markerImg: {
    width: 30,
    height: 40,
    resizeMode: "cover"
  },
  tooltip: { height: 100, width: 150, backgroundColor: "#F4F1F1", borderRadius: 10, padding: 0, margin: 0 },
  markerContainer: {
    alignItems: "center",
    width: 100,
    backgroundColor: "transparent",
    height: 70
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#d11d53",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
    flex: 1
  }
});
