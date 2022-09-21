import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
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
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23
  },
  done: {
    zIndex: 1000,
    left: "80%",
    position: "absolute",
    top: "85%",
    backgroundColor: "#76b830",
    padding: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23
  }

});

export const autoCompleteStyles = StyleSheet.create({
  mainContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 15, height: "100%" },
  autoCompleteCOntainer: { zIndex: 1000, width: "90%", alignSelf: "center" },
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

const GOOGLE_API_KEY = "Your Google Api Key";
const addressAutocompleteOptions = {
  placeholder: "Search",
  initialRegion: {
    latitude: 37.871666,
    longitude: -122.272781,
    latitudeDelta: 0.09219995170899864,
    longitudeDelta: 0.0922 * ASPECT_RATIO
  },
  minLength: 2,
  fetchDetails: true,
  onChangeText: (text) => { },
  onAddressSelect: (data, details) => { },
  onFail: () => { },
  onNotFound: () => { },
  styles: "",
  hideMap: true,
  country: "US",
  predefinedPlaces: [],
  predefinedPlacesAlwaysVisible: true,
  autoFillOnNotFound: true,
  disableScroll: false,
  enablePoweredByContainer: false,
  isRowScrollable: true,
  listUnderlayColor: "#c8c7cc",
  listViewDisplayed: "auto",
  timeout: 20000,
  currentLocation: false,
  currentLocationLabel: "",
  renderLeftButton: () => { },
  renderRightButton: () => { },
  markerUrl: "https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Chartreuse.png",
  markerStyles: null
};

export default {
  apiKey: GOOGLE_API_KEY,
  autoCompleteStyles: autoCompleteStyles,
  styles: styles,
  settings: addressAutocompleteOptions
};
