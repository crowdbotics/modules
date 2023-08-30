import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { OptionsContext } from "@options";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Icon from "react-native-vector-icons/Feather";

navigator.geolocation = require("@react-native-community/geolocation");

const AutoComplete = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  const options = useContext(OptionsContext);
  const { apiKey, autoCompleteStyles, settings } = options;

  const getAddressHandle = (data, address) => {
    if (settings.onAddressSelect) {
      settings.onAddressSelect(data, address);
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
      if (settings.onAddressSelect) {
        settings.onAddressSelect("", address);
      }
    }
  }, [route.params]);

  return (
    <View style={[autoCompleteStyles.mainContainer, { height: inputValue ? "100%" : 50 }]}>
      <View style={[autoCompleteStyles.autoCompleteCOntainer, { width: settings.hideMap ? "100%" : "90%" }]}>
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
          onPress={(data, details = null) => getAddressHandle(data, details)}
          query={{
            key: apiKey,
            language: "en",
            components: `country:${settings.country}`
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
      {
        !settings.hideMap && <TouchableOpacity onPress={() => navigation.navigate("Maps")}>
          <Icon name="map-pin" size={30} color="#95C93F" style={{ marginTop: 20 }} />
        </TouchableOpacity>
      }

    </View>
  );
};

export default AutoComplete;
