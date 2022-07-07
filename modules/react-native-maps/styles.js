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
    marginLeft: scale(10),
    marginRight: scale(10),
    marginTop: scaleVertical(5),
    marginBottom: scaleVertical(5),
    borderRadius: 12,
    borderColor: "#E5E5E5"
  }
});
