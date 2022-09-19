import React, { useState, useContext, useEffect } from "react";
import { Pressable, View } from "react-native";
import { OptionsContext } from "@options";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Feather";

navigator.geolocation = require("@react-native-community/geolocation");

const AutoComplete = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("This is me");
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles, settings } = options;

  const getAddressHandle = (data, address) => {
    if (settings.onPress) {
      settings.onPress(data, address);
    }
    setDefaultValue(data.description);
  };

  const handleChange = (text) => {
    if (settings.onChangeText) {
      settings.onChangeText(text);
    }
    setInputValue(text);
    setDefaultValue(text);
  };

  const handleFail = () => {
    if (settings.onFail) {
      settings.onFail();
    }
  };

  const handleNotFound = () => {
    if (settings.onNotFound) {
      settings.onNotFound();
    }
  };

  useEffect(() => {
    if (route?.params?.address) {
      const { address } = route.params;
      setDefaultValue(address.formatted_address);
      if (settings.onPress) {
        settings.onPress("", address);
      }
    }
  }, [route.params]);

  return (
    <View style={autoCompleteStyles.mainContainer}>
      <View style={{ zIndex: 1000, height: inputValue ? "100%" : 50, width: "90%" }}>
        <GooglePlacesAutocomplete
          autoFillOnNotFound={settings.autoFillOnNotFound || false}
          placeholder={settings.placeholder || "Address"}
          minLength={settings.minLength || 2}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={settings.fetchDetails || true}
          textInputProps={{
            onChangeText: (text) => handleChange(text),
            value: defaultValue
          }}
          getDefaultValue={() => {
            return defaultValue; // text input default value
          }}
          onPress={(data, details = null) => getAddressHandle(data, details)}
          query={{
            key: apiKey,
            language: "en"
          }}
          styles={settings.styles || autoCompleteStyles}
          currentLocation={settings.currentLocation}
          currentLocationLabel={settings.currentLocationLabel}
          predefinedPlaces={settings.predefinedPlaces}
          predefinedPlacesAlwaysVisible={settings.predefinedPlacesAlwaysVisible || false}
          disableScroll={settings.disableScroll || false}
          enablePoweredByContainer={settings.enablePoweredByContainer || false}
          isRowScrollable={settings.isRowScrollable || true}
          listUnderlayColor={settings.listUnderlayColor || "#c8c7cc"}
          listViewDisplayed={settings.listViewDisplayed || "auto"}
          onFail={handleFail}
          onNotFound={handleNotFound}
          timeout={settings.timeout || 20000}
          renderLeftButton={settings.renderLeftButton}
          renderRightButton={settings.renderRightButton}
        />
      </View>
      <Pressable onPress={() => navigation.navigate("Maps")}>
        <Icon name="map-pin" size={30} color="#95C93F" style={{ marginTop: 20 }} />
      </Pressable>
    </View>
  );
};

export default AutoComplete;
