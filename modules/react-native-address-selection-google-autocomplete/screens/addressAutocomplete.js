import React, { useState, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import { OptionsContext } from "@options";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Feather";

navigator.geolocation = require("@react-native-community/geolocation");

const AutoComplete = ({ navigation, route }) => {
  const {
    googleApiKey,
    placeholder,
    minLength,
    fetchDetails,
    onChangeText,
    onPress,
    onFail,
    onNotFound,
    styles,
    predefinedPlaces,
    predefinedPlacesAlwaysVisible,
    autoFillOnNotFound,
    disableScroll,
    enablePoweredByContainer,
    isRowScrollable,
    listUnderlayColor,
    listViewDisplayed,
    timeout,
    currentLocation,
    currentLocationLabel,
    renderLeftButton,
    renderRightButton
  } = route.params?.props;

  const { address } = route.params;
  const [inputValue, setInputValue] = useState("");
  const [placeHolderState, setPlaceHolderState] = useState("");
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles } = options;

  const getAddressHandle = (data, address) => {
    if (onPress) {
      onPress(data, address);
    }
  };

  const handleChange = (text) => {
    if (onChangeText) {
      onChangeText(text);
    }
    setInputValue(text);
    setPlaceHolderState("");
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

  useEffect(() => {
    if (address) {
      setPlaceHolderState(address.formatted_address);
      if (onPress) {
        onPress("", address);
      }
    }
  }, [route.params]);

  return (
    <View style={autoCompleteStyles.mainContainer}>
      <View style={{ zIndex: 1000, height: inputValue ? "100%" : 50, width: "90%" }}>
        <GooglePlacesAutocomplete
          autoFillOnNotFound={autoFillOnNotFound || false}
          placeholder={placeHolderState || placeholder || "Address"}
          minLength={minLength || 2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={fetchDetails || true}
          textInputProps={{
            onChangeText: (text) => { handleChange(text); }

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
          predefinedPlacesAlwaysVisible={predefinedPlacesAlwaysVisible || false}
          disableScroll={disableScroll || false}
          enablePoweredByContainer={enablePoweredByContainer || false}
          isRowScrollable={isRowScrollable || true}
          listUnderlayColor={listUnderlayColor || "#c8c7cc"}
          listViewDisplayed={listViewDisplayed || "auto"}
          onFail={handleFail}
          onNotFound={handleNotFound}
          timeout={timeout || 20000}
          renderLeftButton={renderLeftButton}
          renderRightButton={renderRightButton}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("Maps")}>
        <Icon name="map-pin" size={30} color="#95C93F" style={{ marginTop: 20 }} />
      </Pressable>
    </View>
  );
};

export default AutoComplete;
