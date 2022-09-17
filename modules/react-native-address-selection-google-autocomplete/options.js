import { StyleSheet, Dimensions } from "react-native";

const GOOGLE_API_KEY = "AIzaSyCCVxYoYX8Gd70B6w7ZoGntENMnFfKJrI4";
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
  mainContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 15, paddingRight: 10, height: "100%" },
  textInputContainer: {
    marginTop: 15,
    zIndex: 1000
  },
  textInput: {
    color: "#5d5d5d",
    fontSize: 16,
    flexWrap: "wrap",
    paddingVertical: 5
  },
  predefinedPlacesDescription: {
    color: "#1faadb"
  }
});

export default {
  apiKey: GOOGLE_API_KEY,
  autoCompleteStyles: autoCompleteStyles,
  styles: styles
};
