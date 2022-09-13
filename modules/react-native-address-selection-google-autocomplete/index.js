import React, { useState, useContext } from "react";
import { View } from "react-native";
import { OptionsContext } from "@options";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

navigator.geolocation = require("@react-native-community/geolocation");

const AddressAutoComplete = ({
  navigation,
  googleApiKey,
  placeholder = "Address",
  minLength = 2,
  fetchDetails = true,
  onChangeText,
  onPress,
  onFail,
  onNotFound,
  styles,
  predefinedPlaces,
  predefinedPlacesAlwaysVisible = false,
  autoFillOnNotFound = false,
  disableScroll = false,
  enablePoweredByContainer = true,
  isRowScrollable = true,
  listUnderlayColor = "#c8c7cc",
  listViewDisplayed = "auto",
  timeout = 20000,
  currentLocation = false,
  currentLocationLabel = "Current Location",
  renderLeftButton,
  renderRightButton
}) => {
  const [inputValue, setInputValue] = useState("");
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles } = options;

  const getAddressHandle = (data, address) => {
    if (onPress) {
      onPress(data, address);
    }
  };

  const handleChange = (text) => {
    if (onChangeText) {
      onChangeText();
    }
    setInputValue(text);
  };

  const handleFail = () => {
    if (onFail) {
      onFail();
    }
  };

  const handleNotFound = () => {
    if (onNotFound) {
      onNotFound();
    }
  };

  return (

    <View style={{ zIndex: 1000, height: inputValue ? "100%" : 200 }}>
      <GooglePlacesAutocomplete
        autoFillOnNotFound={autoFillOnNotFound}
        placeholder={placeholder}
        minLength={minLength}
        autoFocus={false}
        returnKeyType={"default"}
        fetchDetails={fetchDetails}
        textInputProps={{
          onChangeText: (text) => handleChange(text)
        }}
        onPress={(data, details = null) => getAddressHandle(data, details)}
        query={{
          key: googleApiKey || apiKey,
          language: "en"
        }}
        styles={styles || autoCompleteStyles}
        currentLocation={currentLocation}
        currentLocationLabel={currentLocationLabel}
        predefinedPlaces={predefinedPlaces}
        predefinedPlacesAlwaysVisible={predefinedPlacesAlwaysVisible}
        disableScroll={disableScroll}
        enablePoweredByContainer={enablePoweredByContainer}
        isRowScrollable={isRowScrollable}
        listUnderlayColor={listUnderlayColor}
        listViewDisplayed={listViewDisplayed}
        onFail={handleFail}
        onNotFound={handleNotFound}
        timeout={timeout}
        renderLeftButton={renderLeftButton}
        renderRightButton={renderRightButton}
      />
    </View>
  );
};

export default {
  title: "AddressAutoComplete",
  navigator: AddressAutoComplete
};
