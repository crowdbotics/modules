import { StyleSheet } from "react-native";

const MAPBOX_TOKEN = "sk.eyJ1IjoiZnNvdWRhIiwiYSI6ImNsZGlwNWdwcTFqdWozcnFwa3Nwc3RwdGoifQ.UnMCRmYGEZBjTHY3hBOhCA";
const mapStyleURL = "mapbox://styles/fsouda/cldejkf2t001201nwyihsky1c";
const ORIGIN = [68.377411, 30.573721];
const DESTINATION = [70.331231, 31.904664];
const GOOGLE_API_KEY = "AIzaSyBBAV8nWjXDMvpOxR1s90btGIBtudKt61o";
const POLYGON = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [67.06168864057639, 30.19125014188451],
        [69.23506795385327, 30.446385920247238],
        [66.5344736417654, 27.801480997434084],
        [67.06168864057639, 30.19125014188451]
      ]
    ]
  }
};

const MAP_SETTINGS = {
  logoEnabled: false,
  zoomLevel: 6,
  compassEnabled: true,
  localizeLabels: true,
  zoomEnabled: true
};
const ROUTE = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          ORIGIN,
          DESTINATION
        ]
      }
    }
  ]
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
  tooltip: { height: 100, width: 150, backgroundColor: "#F4F1F1", borderRadius: 10, padding: 0, margin: 0 },
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
  compassStyle: { top: 30, right: 30 },
  icon: {
    fontSize: 30,
    color: "#9aa7fb"
  },
  centeringButton: {
    paddingTop: 10,
    backgroundColor: "#fff",
    position: "absolute",
    padding: 8,
    right: 8,
    borderRadius: 5
  },
  bottomSheet: {
    paddingTop: 10,
    backgroundColor: "#000",
    opacity: 0.8,
    position: "absolute",
    padding: 8,
    bottom: 0,
    width: "100%"
  }
});

export default {
  MAPBOX_TOKEN,
  mapStyleURL,
  styles,
  ORIGIN,
  DESTINATION,
  POLYGON,
  ROUTE,
  MAP_SETTINGS,
  GOOGLE_API_KEY
};
