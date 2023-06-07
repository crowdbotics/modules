import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

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
  searchbar: {
    backgroundColor: "white",
    marginLeft: scale(15),
    marginRight: scale(15),
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(5),
    borderRadius: 8,
    borderColor: "#E5E5E5",
    zIndex: 9,
    paddingHorizontal: 10
  },
  directionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 7,
    paddingVertical: 5,
    position: "absolute",
    bottom: 30,
    left: 30,
    zIndex: 999,
    borderRadius: 30,
    elevation: 5
  },
  marker: { height: 40, width: 40, resizeMode: "contain" },
  tooltip: { height: 100, width: 150, backgroundColor: "#F4F1F1", borderRadius: 10, padding: 0, margin: 0 }
});

export const autoCompleteStyles = StyleSheet.create({
  textInputContainer: {
    marginHorizontal: 15,
    top: 10,
    zIndex: 1000
  },
  textInput: {
    height: 44,
    color: "#5d5d5d",
    fontSize: 16
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  }
});
