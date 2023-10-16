import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  cameraContainer: {
    width: "100%",
    height: "100%"
  },
  cameraUIView: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%"
  },
  menuButton: {},
  filterContainer: {
    width: "100%",
    marginTop: -190,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

export const FILTERS = [
  {
    id: 1,
    settings: 2,
    name: "Negative"
  },
  {
    id: 2,
    settings: 4,
    name: "Sharp"
  },
  {
    id: 3,
    settings: 6,
    name: "Vintage"
  },
  {
    id: 4,
    settings: 8,
    name: "Flare"
  },
  {
    id: 5,
    settings: 10,
    name: "Iris"
  },
  {
    id: 6,
    settings: 12,
    name: "Amaro"
  },
  {
    id: 7,
    settings: 14,
    name: "Lomo"

  },
  {
    id: 8,
    settings: 16,
    name: "Sepia"
  }
];

export default {
  styles: styles,
  FILTERS:FILTERS
}