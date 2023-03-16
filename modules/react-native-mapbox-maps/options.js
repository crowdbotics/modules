import { StyleSheet } from "react-native";

const MAPBOX_TOKEN = "Mapbox Access token";
const mapStyleURL = "Map Style URL";
const ORIGIN = [66.99388832116034, 30.15489668965283];
const MARKED_CENTERED = [67.01328210715224, 30.19992930290644];
const GOOGLE_API_KEY = "Google API Key";
const POLYGON = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [67.0025388109022, 30.145163342632628],
        [66.99652020824672, 30.134028219157344],
        [67.01640602948962, 30.141351645223594],
        [67.0025388109022, 30.145163342632628]
      ]
    ]
  }
};

const MAP_SETTINGS = {
  logoEnabled: false,
  zoomLevel: 8,
  compassEnabled: true,
  localizeLabels: true,
  zoomEnabled: true
};

const styles = StyleSheet.create({
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
  tooltip: {
    height: 100,
    width: 150,
    backgroundColor: "#F4F1F1",
    borderRadius: 10,
    padding: 0,
    margin: 0
  },
  markerContainer: {
    alignItems: "center",
    width: 130,
    backgroundColor: "transparent",
    height: 80
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
  },
  compassStyle: {
    top: 30,
    right: 30
  },
  icon: {
    fontSize: 30,
    color: "#9aa7fb"
  },
  icon2: {
    fontSize: 27,
    color: "#000"
  },
  centeringButton: {
    paddingTop: 10,
    backgroundColor: "#fff",
    position: "absolute",
    padding: 8,
    right: 8,
    borderRadius: 5,
    bottom: 90
  },
  scaleBar: {
    top: 20,
    left: 18
  },
  topContainer: { flexDirection: "row", alignItems: "center" },
  profileContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", width: 130 },
  profileIco: { paddingHorizontal: 5 },
  drive: { height: 50, width: 50, resizeMode: "contain" },
  cycle: { height: 30, width: 30, resizeMode: "contain" },
  walk: { height: 25, width: 25, resizeMode: "contain" }
});

export default {
  MAPBOX_TOKEN,
  mapStyleURL,
  styles,
  ORIGIN,
  POLYGON,
  MAP_SETTINGS,
  GOOGLE_API_KEY,
  MARKED_CENTERED
};
