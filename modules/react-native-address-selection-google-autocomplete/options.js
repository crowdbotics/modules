const { StyleSheet } = require("react-native");

const GOOGLE_API_KEY = "Your Google API key";

const autoCompleteStyles = StyleSheet.create({
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

export default {
  apiKey: GOOGLE_API_KEY,
  autoCompleteStyles: autoCompleteStyles
};
