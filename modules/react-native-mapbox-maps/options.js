import { StyleSheet } from "react-native";

const MAPBOX_TOKEN = "sk.eyJ1IjoiZnNvdWRhIiwiYSI6ImNsZGlwNWdwcTFqdWozcnFwa3Nwc3RwdGoifQ.UnMCRmYGEZBjTHY3hBOhCA";
const mapStyleURL = "mapbox://styles/fsouda/cldejl0dv007r01r04lobz2ll"
const ORIGIN = [69.28104374759553, 27.69129424991459]
const DESTINATION = [73.12076538972593, 30.71524733596121]
const ORIGIN_TITLE = 'Karachi'
const DESTINATION_TITLE = 'Quieta'

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
}

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
}

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
  },
  compassStyle:{ top: 30, right: 30 }
});

export default {
  MAPBOX_TOKEN,
  mapStyleURL,
  styles,
  ORIGIN,
  DESTINATION,
  POLYGON,
  ROUTE,
  ORIGIN_TITLE,
  DESTINATION_TITLE
}
